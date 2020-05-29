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
const refresh = require('./logged/refresh');
const licence = require('./logged/licence');
const dashboard = require('./logged/dashboard');

logged.use('/console', console);
logged.use('/tarif', tarif);
logged.use('/poste', poste);
logged.use('/posteact', posteact);
logged.use('/vente', vente);
logged.use('/user', user);
logged.use('/raport', raport);
logged.use('/refresh', refresh);
logged.use('/licence', licence);
logged.use('/dashboard', dashboard)

module.exports = logged;