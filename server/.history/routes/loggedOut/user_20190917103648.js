const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const { body, query } = require('express-validator/check');
const User = require('../../models/User');
const router = express.Router();

/*
 Routes for post and get local machine mac address
*/

router.get('/username/check', function (req, res, next) {
   let error = new Error();
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