const { app, BrowserWindow } = require('electron')

if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

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
    win = null;
  });

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
/*
This setup does not support hot code reloads. Whenever you change some Angular code, you need to rerun the electron-build command. It is possible to setup hot reloads by pointing the window to a remote URL (such as https://localhost:4200) and running ng serve in a separate terminal.
*/
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