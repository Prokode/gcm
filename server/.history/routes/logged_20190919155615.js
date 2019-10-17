const express = require('express');
const loggedOut = express();

// console Routes
const console = require('./logged/console');


logged.use('/console', console);


module.exports = logged;