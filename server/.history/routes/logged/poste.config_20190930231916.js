const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');
const Console = require('../../models/Console');
const { validationResult } = require('express-validator');
const posteReqValidators = require('../../shared/poste.req.validators');

/*
 Routes for consoles
*/

router.get('/list', function (req, res, next) {
});

module.exports =  router;