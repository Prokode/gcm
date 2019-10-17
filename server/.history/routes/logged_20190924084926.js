const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/tarif');

logged.use('/console', console);
logged.use('/tarif', console);

module.exports = logged;