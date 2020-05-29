const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const userReqValidators = require('../../shared/user.req.validators');
const User = require('../../shared/db/models/User');
const router = express.Router();

const pwdhash = require('password-hash');
/*
 Routes for post and get local machine mac address
*/

router.get('/society', function (req, res, next) {
    let error = new Error();
    try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
            }

            // let id = req.query.id ? req.query.id : req.user.user_id;
            
            User.findOne({role: 'ADMIN'}, function(err, user) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                    return;
                }
                res.send(user);
            });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});

router.get('/username/check', userReqValidators.validate('checkUsername'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        User.find({}, function (err, users) {
            if(err) {
              error.status = 500;
              next(error);
              return;
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
          return;
        }

            const body = _.pick(req.body, ['username', 'password', 'lastname', 'firstname', 'rp', 'society']);

            const user = { firstname: body.firstname, lastname: body.lastname,
                 username: body.username, password: pwdhash.generate(body.password), role: 'ADMIN', 
                society: body.society };
                 
            const root =  { firstname: 'ROOT', lastname: 'root',
                username: 'root', password: pwdhash.generate('pwd' + body.rp), role: 'ROOT'};

            User.remove({}, {multi: true}, function (err, numRemoved) {
                if (err) {
                  error.status = 500;
                  error.message = err;
                  next(error);
                  return;
                }
                User.insert([root, user], function (err, users) {
                    if (err) {
                        error.status = 500;
                        error.message = err;
                        next(error);
                        return;
                    } else {
                        res.send({
                        message : 'success'
                        });
                    }
                });
            });        

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

module.exports =  router;