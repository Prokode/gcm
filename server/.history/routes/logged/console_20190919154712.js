const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../shared/globals');
const { validationResult } = require('express-validator');
const authReqValidators = require('../shared/auth.req.validators');
const Auth = require('../models/Auth');
const router = express.Router();
const db = require('electron-db');
const passport = require('passport');
const jwt = require('jsonwebtoken');
/*
 Routes for authentification
*/

router.post('/signin', authReqValidators.validate('signin'), function (req, res, next) {
    let error = new Error();
})