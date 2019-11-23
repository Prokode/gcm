const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const ReqValidators = require('../../shared/tarif.req.validators');


/*
 Routes for consoles
*/

router.get('/', function (req, res, next) {

});


module.exports = router;