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

router.get('/list', function (req, res, next) {
    let error = new Error();
    const checkDB = globals.dbTableExist('consoles');
    if (!checkDB) {
        res.send([]);
    }

    db.getAll('consoles', globals.DB_PATH, (succ, data) => {
                
        if (!succ) {
            error.status = 500;
            next(error);
        }

        const consoles = data.map(
            (d) => {
                return {
                    id: d.id
                }
            }
        )

    });    
});