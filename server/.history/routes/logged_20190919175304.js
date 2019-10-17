const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');


logged.use('/console', console);


module.exports = logged;