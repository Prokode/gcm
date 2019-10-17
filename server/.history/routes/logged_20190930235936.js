const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/tarif');
const poste = require('./logged/poste');
const poste_config = require('./logged/poste.config');

logged.use('/console', console);
logged.use('/tarif', tarif);
logged.use('/poste', poste);
logged.use('/poste', poste);

module.exports = logged;