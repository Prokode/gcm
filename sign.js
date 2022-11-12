const { MSICreator } = require('electron-wix-msi');

( async () => { 
// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: './release/Game_Center_Manager Setup 1.0.6.exe',
  description: 'GCM app ',
  exe: 'GCM',
  name: 'Game Center Manager',
  manufacturer: 'DOTCOM & TKSM techs',
  version: '1.0.6',
  outputDirectory: '/app',
  certificateFile: './cert.pfx',
  certificatePassword: '@&GCMANAGERWEB*/!2019=@',
});

// Step 2: Create a .wxs template file
let supportBinaries = await msiCreator.create();
 
// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
supportBinaries.forEach(async (binary) => {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary)
})

// Step 3: Compile the template to a .msi file
(async () => {
    await msiCreator.compile();
})();

})();
