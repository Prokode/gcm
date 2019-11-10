const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const userReqValidators = require('../../shared/user.req.validators');
const User = require('../../shared/db/models/User');
const router = express.Router();
const db = require('electron-db');

/*
 Routes for post and get local machine mac address
*/

router.get('/username/check', userReqValidators.validate('checkUsername'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        User.find({}, function (err, users) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!users.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = users.filter(function(d) {
                        return d.username.toLowerCase() === req.query.username.toLowerCase();
                    });
                    
                    if (dataFilt.length === 0) {
                        res.send({
                            unused: true
                        });
                    } else {
                        res.send({
                            unused: false
                        });
                    }
                } catch(err) {
                    error.status = 500;
                    next(error);
                }
            }
        });    

        // if (!checkDB) {
        //     res.send({
        //         unused: true
        //     });
        // } else {
        //     db.getAll('users', globals.DB_PATH, (succ, data) => {
                
        //         if (!succ) {
        //             error.status = 500;
        //             next(error);
        //         }
        //         try { 
        //             const dataFilt = data.filter(function(d) {
        //                 return base64.decode(d.username).toLowerCase() === req.query.username.toLowerCase();
        //             });
                    
        //             if (dataFilt.length === 0) {
        //                 res.send({
        //                     unused: true
        //                 });
        //             } else {
        //                 res.send({
        //                     unused: false
        //                 });
        //             }
        //         } catch(err) {
        //             error.status = 500;
        //             next(error);
        //         }
                
        //     });
        // }
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

            const body = _.pick(req.body, ['username', 'password', 'lastname', 'firstname']);
            const user = new User({ firstn username: body.username, password: body.password, role: 'ADMIN'});

            user.save(function(err) {
                if (err) {
                    error.status = 500;
                    error.message = err;
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