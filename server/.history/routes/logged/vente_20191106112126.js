const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const consoleReqValidators = require('../../shared/console.req.validators');

const Console = require('../../shared/db/models/Console');
const Tarif = require('../../shared/db/models/Tarif');
/*
 Routes for consoles
*/

router.post('/create', consoleReqValidators.validate('create'), function (req, res, next) {

});