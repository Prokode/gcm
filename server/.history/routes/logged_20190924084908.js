const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const consol = require('./logged/console');

logged.use('/console', consol);


module.exports = logged;