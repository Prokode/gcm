const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const authReqValidators = require('../../shared/auth.req.validators');
const User = require('../../models/User');
const router = express.Router();
const db = require('electron-db');

/*
 Routes for authentification
*/

router.post('/signin', userReqValidators.validate('createUser'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }

        const checkDB = globals.dbTableExist('users');
        if (!checkDB) {
            db.createTable('users',  globals.DB_PATH, (succ, msg) => {
                if (!succ) {
                  error.status = 500;
                  next(error);
                }
            });
        }
            const body = _.pick(req.body, ['username', 'password']);
            const user = new User(body.username, body.password, 'ADMIN');

            db.insertTableContent('users', globals.DB_PATH, user, (succ, msg) => {
                if (!succ) {
                    error.status = 500;
                    next(error);
                } else {
                    res.send({
                    message : 'success'
                    });
                }
            });
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

module.exports =  router;