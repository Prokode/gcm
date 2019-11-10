const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

const Vente = require('../../shared/db/models/Vente');
const Poste = require('../../shared/db/models/Poste');
/*
 Routes for consoles
*/

router.post('/create', consoleReqValidators.validate('create'), function (req, res, next) {

});

module.exports =  router;