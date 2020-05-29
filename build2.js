const installer = require('electron-installer-windows')

const options = {
  src: 'GCM-win32-x64/',
  dest: 'installer/',
  authors: [
      'TKSM Software',
      'DOTCOM'
  ],
  animation: './assets/images/logo.gif',
  icon: './assets/images/logo.ico',
  description: 'Game Center Manager to manage properly your Game Center room.'
}

async function main (options) {
  console.log('Creating package (this may take a while)')
  try {
    await installer(options)
    console.log(`Successfully created package at ${options.dest}`)
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}
main(options)