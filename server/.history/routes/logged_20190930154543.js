const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/tarif');
const poste = require('./logged/poste');

logged.use('/console', console);
logged.use('/tarif', tarif);

module.exports = logged;