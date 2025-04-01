const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1800,
    height: 1600
  })

  win.loadURL("https://boilerplate.bayesian-labs.com");
}

app.whenReady().then(() => {
  createWindow()
})