const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/tarif');
const poste = require('./logged/poste');
const poste_config = require('./logged/poste_configs');

logged.use('/console', console);
logged.use('/tarif', tarif);
logged.use('/poste', poste);
logged.use('/poste_config', poste_config);

module.exports = logged;