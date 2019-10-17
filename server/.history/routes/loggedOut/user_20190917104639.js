const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator/check');
const userReqValidators = require('../../shared/user.req.validators');
const User = require('../../models/User');
const router = express.Router();
var base64 = require('base-64');

/*
 Routes for post and get local machine mac address
*/

router.get('/username/check', userReqValidators.validate('checkUsername'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }
        const checkDB = globals.dbTableExist('users');
        if (!checkDB) {
                res.send({
                    unused: true
                });
        } else {
            db.search('users', globals.DB_PATH, 'username', req.query.username, (succ, data) => {
                if (data) {
                    res.send({
                        unused: false
                    });
                } else if (!data) {
                    res.send({
                        unused: true
                    });
                }
            });
        }
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

router.post('/create', userReqValidators.validate('createUser'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }

        const checkDB = globals.dbTableExist('users');
        if (!checkDB) {
            error.status = 500;
            next(error);
        } else {
            const body = _.pick(req.body, ['username', 'password']);
            const user = new User(  body.username, body.password, 'ADMIN');

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
        }
    } catch(err) {
        error.status = 500;
        next(error);
    }    
});

module.exports =  router;