function msToTime(ms) {
  // Converts milliseconds to h:mm:ss format
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h ? h + 'h ' : ''}${m ? m + 'm ' : ''}${s}s`;
}

function displayTodayLogs() {
  chrome.storage.local.get(['timeLogs'], (res) => {
    const logs = res.timeLogs || {};
    // 1. Total time tracked (all sites)
    const totalMs = Object.values(logs).reduce((a, b) => a + b, 0);
    // 2. Time since midnight
    const now = new Date();
    const msSinceMidnight = now - new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let html = `<h3>Today's Time Spent per Site</h3>`;
    html += `<div><strong>Time already passed today:</strong> ${msToTime(msSinceMidnight)}</div>`;
    html += `<div><strong>Total time spent in Chrome (tracked):</strong> ${msToTime(totalMs)}</div>`;

    if (Object.keys(logs).length === 0) {
      html += '<p>No data tracked today yet.</p>';
    } else {
      html += '<ul>';
      for (const [site, ms] of Object.entries(logs)) {
        html += `<li><strong>${site}</strong>: ${msToTime(ms)}</li>`;
      }
      html += '</ul>';
    }
    document.getElementById('result').innerHTML = html;
  });
}

// Call on popup open
displayTodayLogs();

document.getElementById("push-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "pushToWebhook" }, (response) => {
    if (chrome.runtime.lastError) {
      alert("Error: " + chrome.runtime.lastError.message);
    } else if (response && response.success) {
      alert("Pushed to webhook!");
    } else {
      alert("Failed to push.");
    }
  });
});