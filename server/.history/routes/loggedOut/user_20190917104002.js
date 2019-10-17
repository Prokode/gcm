const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator/check');
const userReqValidators = require('../../shared/user.req.validators');
const User = require('../../models/User');
const router = express.Router();

/*
 Routes for post and get local machine mac address
*/

router.get('/username/check', userReqValidators function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const checkDB = globals.dbTableExist('users');
        if (!checkDB) {
                res.send({
                    unused: true
                });
        } else {
            if (!req.query) {
                error.status = 400;
                next(error);
            }
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

router.post('/create', function (req, res, next) {
    let error = new Error();
    const checkDB = globals.dbTableExist('users');
    if (!checkDB) {
        error.status = 500;
        next(error);
    } else {

        if (!req.body) {
            error.status = 400;
            next(error);
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
    }
});

module.exports =  router;