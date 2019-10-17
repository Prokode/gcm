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
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }

        const checkDB = globals.dbTableExist('users');
        if (!checkDB) {
            error.status = 500;
            next(error);
        }
        
        // const body = _.pick(req.body, ['username', 'password']);
        
        passport.authenticate('local', {session: false}, function(err, user, info) {
            var error = new Error();
            if (err || !user) {
                error.status  = err.status ? err.status : 500;
                error.message = err.message ? err.message : null;
                next(error);
            } else {
                    req.login(user, {session: false}, function(err) {
                    if (err) {
                            error.status = 500;
                            next(error);
                    }
                    const token = jwt.sign({
                        username: base64.decode(user.username),
                        role: base64.decode(user.role),
                        id: user.id,
                        iat: Math.floor(Date.now() / 1000) - 30
                    }, globals.jwtSecret, {expiresIn: '24 hours'});
                        // generate the token   
                        // auth playload
                    const auth = new Auth(user.id, token);

                    const checkDB = globals.dbTableExist('auths');
                    
                    if (!checkDB) {
                        db.createTable('auths',  globals.DB_PATH, (succ, msg) => {
                            if (!succ) {
                              error.status = 500;
                              next(error);
                            }
                        });
                    }

                    db.insertTableContent('auths', globals.DB_PATH, auth, (succ, msg) => {
                        if (!succ) {
                            error.status = 500;
                            next(error);
                        } else {
                            res.send({token: token});   
                        }
                    });       
                });
            }
        })(req, res, next);
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

module.exports =  router;