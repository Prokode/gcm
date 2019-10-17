const express = require('express');
const loggedOut = express();

// console Routes
const console = require('./logged/console');


loggedOut.use('/console', console);


module.exports = loggedOut;