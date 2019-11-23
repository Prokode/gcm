const express = require('express');
const logged = express();

// console Routes
const console = require('./logged/console');
const tarif = require('./logged/tarif');
const poste = require('./logged/poste');
const posteact = require('./logged/posteact');
const vente = require('./logged/vente');
const user = require('./logged/user');
const raport = require('./logged/raport');

logged.use('/console', console);
logged.use('/tarif', tarif);
logged.use('/poste', poste);
logged.use('/posteact', posteact);
logged.use('/vente', vente);
logged.use('/user', user);
logged.use('/user', user);

module.exports = logged;