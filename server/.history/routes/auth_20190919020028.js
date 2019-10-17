const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../shared/globals');
const { validationResult } = require('express-validator');
const authReqValidators = require('../shared/auth.req.validators');
const User = require('../models/User');
const router = express.Router();
const db = require('electron-db');

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
        
        const body = _.pick(req.body, ['username', 'password']);
        
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
                res.send()      
                Auth.findOne({unid: user.unid, delatedAt: null}).then(
                        function(auth) {
                            if (auth) {
                                Auth.findOneAndUpdate({unid: user.unid, token: auth.token},
                                    {$set: {delatedAt: new Date()}}, {returnOriginal: false, new: true}).then(
                                    function (result) {
                                        const authPayload = {
                                            unid: user.unid,
                                            token: token,
                                            createdAt: new Date(),
                                            delatedAt: null
                                        }
                                        // save the authentification
                                        Auth.create(authPayload).then(
                                                function (newAuthPayload) {
                                                    res.send(newAuthPayload);
                                           }).catch(next);
                                       
                                }).catch(next);
                            } else {
                                const authPayload = {
                                    unid: user.unid,
                                    token: token,
                                    createdAt: new Date(),
                                    delatedAt: null
                                }
                                // save the authentification
                                Auth.create(authPayload).then(
                                        function (newAuthPayload) {
                                            res.send(newAuthPayload);
                                        }).catch(next);
                            }
                        }
                    ).catch(next);                
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