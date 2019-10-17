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
 Routes for encode data for poste_configs
*/

router.get('/encode', function (req, res, next) {
    res.send({
        poste: base64.encode('POSTE 1'),
        id: base64.encode(1)
    })
});

module.exports =  router;