// const electronInstaller = require('electron-winstaller');
// // Then do a build like so..

// try {
//   await electronInstaller.createWindowsInstaller({
//     appDirectory: '/GCM-win32-x64',
//     outputDirectory: '/installer',
//     authors: 'DOTCOM & TKSM softs.',
//     exe: 'gcm.exe'
//   });
//   console.log('It worked!');
// } catch (e) {
//   console.log(`No dice: ${e.message}`);
// }

// C:\Users\sdkca\Desktop\electron-workspace\build.js
var electronInstaller = require('electron-winstaller');
// In this case, we can use relative paths
var settings = {
// Specify the folder where the built app is located
appDirectory: './gcm',
// Specify the existing folder where
outputDirectory: './installer',
// The name of the Author of the app (the name of your company)
authors: 'DOTCOM & TKSM softs.',
exe: 'Game_Center_Manager.exe',
// loadingGif: 'https://eseaqua.com/logo.gif',
description: 'Game Center Manage App',
// iconUrl: 'https://eseaqua.com/logo.ico',
// setupIcon: 'https://eseaqua.com/logo.ico',
// setupExe: 'GCM',
// setupMsi: 'GCM'
};
resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then(() => {
console.log("The installers of your application were succesfully created !");
}, (e) => {
console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});