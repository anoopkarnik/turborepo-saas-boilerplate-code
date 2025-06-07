let currentTab = null;
let startTime = null;
let isActive = true;

// Function to stop tracking
function pauseTracking() {
  if (isActive) {
    // Log any time before pausing
    if (currentTab && startTime) {
      const now = Date.now();
      const duration = now - startTime;
      saveTime(currentTab.url, duration);
    }
    isActive = false;
    startTime = null;
    console.log("Tracking paused (idle)");
  }
}

// Function to start/restart tracking
function resumeTracking() {
  if (!isActive) {
    startTime = Date.now();
    isActive = true;
    console.log("Tracking resumed (active)");
  }
}

chrome.idle.setDetectionInterval(60); //

// Set up idle detection
chrome.idle.onStateChanged.addListener(function(newState) {
  if (newState === "idle" || newState === "locked") {
    pauseTracking();
  } else if (newState === "active") {
    resumeTracking();
  }
});

// Update currentTab on tab switch/update
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  logTime(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    logTime(tab);
  }
});

chrome.alarms.create('pushLogs', { periodInMinutes: 60 }); // Push logs every hour

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'pushLogs') {
    chrome.storage.local.get(['timeLogs'], res => {
      pushToWebhook(res.timeLogs || {});
      // Optionally clear logs after pushing:
      chrome.storage.local.set({ timeLogs: {} });
    });
  }chrome.idle.setDetectionInterval(60); //
});

// Listen for popup message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "pushToWebhook") {
    chrome.storage.local.get(['timeLogs'], res => {
      pushToWebhook(res.timeLogs || {});
      sendResponse({ success: true });
    });
    // This line is needed because sendResponse is async
    return true;
  }
});

function logTime(tab) {
  const now = Date.now();
  if (currentTab && startTime) {
    const duration = now - startTime;
    saveTime(currentTab.url, duration);
  }
  currentTab = tab;
  if (isActive) startTime = now;
}


// Update active tab every second (or 5 seconds to reduce writes)
setInterval(() => {
  if (isActive && currentTab && startTime) {
    const now = Date.now();
    const duration = now - startTime;
    saveTime(currentTab.url, duration);
    startTime = now;
  }
}, 1000); // every second, or use 5000 for every 5s


function saveTime(url, duration) {
  chrome.storage.local.get(["timeLogs"], (res) => {
    const logs = res.timeLogs || {};
    const domain = new URL(url).hostname;
    logs[domain] = (logs[domain] || 0) + duration;
    chrome.storage.local.set({ timeLogs: logs });
  });
}

// Call this function to send logs
function pushToWebhook(logs) {
  fetch("{n8nWebhookUrlToSendHourlyDataTo}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      data: logs,
      source: "time-tracker-extension"
    })
  })
  .then(res => res.json())
  .then(data => console.log("Webhook response:", data))
  .catch(err => console.error("Webhook error:", err));
}