const express = require('express');
const web = express();

// web Routes
const vente = require('./web/vente');


web.use('/vente', vente);

module.exports = web;