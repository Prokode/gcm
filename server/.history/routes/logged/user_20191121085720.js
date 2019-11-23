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

router.post('/create', userReqValidators.validate('createUser'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
        }

            const body = _.pick(req.body, ['username', 'password', 'lastname', 'firstname', 'role']);
            const user = new User({ firstname: body.firstname, lastname: body.lastname,
                 username: body.username, password: body.password, role: body.role});

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

router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        
        User.find({}).sort({ created_at: -1 }).exec(function(err, users) {
            if (err) {
                error.status = 500;
                next(error);
            }

            res.send({
                message: 'success',
                users: users
            });
        });
        
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});


/* Validators 
module.exports =  router;