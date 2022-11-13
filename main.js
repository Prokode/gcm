const { app, BrowserWindow, ipcMain, IpcMessageEvent } = require('electron');
const fs = require('fs');
const { autoUpdater } = require("electron-updater");


if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  // 
  // cp "D:/projects/GCM/gcm/src/assets/icon.ico" "D:/projects/GCM/gcm/dist"
  return;
}

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true // <-- important
    }
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools();
  
  win.on('close', async function () {

  });


  // Event when the window is closed.
  win.on('closed', async function () {

    win = null;
    
  });

  const log = require("electron-log");
  log.transports.file.level = "debug";
  autoUpdater.logger = log;
  autoUpdater.checkForUpdatesAndNotify();

  win.removeMenu();

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
});

ipcMain.on('reload_app', function (event) {
  app.relaunch();
  app.exit();
});

/*
This setup does not support hot code reloads. Whenever you change some Angular code, you need to rerun the electron-build command. It is possible to setup hot reloads by pointing the window to a remote URL (such as https://localhost:4200) and running ng serve in a separate terminal.
*/

// Check for data directory to check if exists
try {

  const userDataPath = app.getPath('userData');
  const dir = userDataPath + '/db/data';

  console.log(userDataPath);
  console.log(dir);

  // check if directory exists
  if (fs.existsSync(dir)) {
      console.log('Directory exists!');
  } else {
    // If data don't exist create data directory
      console.log('Directory not found.');
      fs.mkdirSync(dir, { recursive: true });
  }

} catch(e) {
  console.log(e);
}

require('./server/server.js');
/*
electron-packager ./build/dist build-with-native-modules --platform=darwin --arch=x64 --out=./build/sa_packager --overwrite=true
electron-packager .
*/

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
  return false;
  }
  const ChildProcess = require('child_process');
  const path = require('path');
  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);
  const spawn = function(command, args) {
    let spawnedProcess, error;
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) {}
    return spawnedProcess;
  };
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
  case '--squirrel-install':
    spawnUpdate(['--createShortcut', exeName]);
    return true;
  case '--squirrel-updated':
    // Optionally do things such as:
    // - Add your .exe to the PATH
    // - Write to the registry for things like file associations and
    //   explorer context menus
    // Install desktop and start menu shortcuts
    spawnUpdate(['--createShortcut', exeName]);
    setTimeout(application.quit, 1000);
    return true;
  case '--squirrel-uninstall':
    // Undo anything you did in the --squirrel-install and
    // --squirrel-updated handlers
    // Remove desktop and start menu shortcuts
    spawnUpdate(['--removeShortcut', exeName]);
    setTimeout(application.quit, 1000);
    return true;
  case '--squirrel-obsolete':
    // This is called on the outgoing version of your app before
    // we update to the new version - it's the opposite of
    // --squirrel-updated
    application.quit();
    return true;
  }
};