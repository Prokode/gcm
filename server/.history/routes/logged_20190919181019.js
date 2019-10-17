const express = require('express');
const logged = express();

// console Routes
const consol = require('./logged/console');


logged.use('/console', console);


module.exports = logged;