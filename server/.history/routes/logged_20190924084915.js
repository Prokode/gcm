const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/console');

logged.use('/console', console);


module.exports = logged;