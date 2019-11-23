const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const raportReqValidators = require('../../shared/raport.req.validators');


/*
 Routes for raport
*/

router.get('/', raportReqValidators.validate('get_raport'), function (req, res, next) {

});


module.exports = router;