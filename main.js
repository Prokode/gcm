const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
/*
This setup does not support hot code reloads. Whenever you change some Angular code, you need to rerun the electron-build command. It is possible to setup hot reloads by pointing the window to a remote URL (such as https://localhost:4200) and running ng serve in a separate terminal.
*/
require('./server/server.js');
/*
electron-packager ./build/dist build-with-native-modules --platform=darwin --arch=x64 --out=./build/sa_packager --overwrite=true
electron-packager .
*/