const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const refreshReqValidators = require('../../shared/refresh.req.validators');
const User = require('../../shared/db/models/User');
const router = express.Router();
const db = require('electron-db');
const phash = require('password-hash');

/*
 Routes for post and get local machine mac address
*/
router.post('/password', refreshReqValidators.validate('password'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const body = _.pick(req.body, ['password']);
        
        User.findOne({_id: req.user.user_id}, function(err, user) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
                return;
            }
            
            if (phash.verify(body.password, user.password)) { 
                res.send({
                    message: 'success'
                });
            } else {
                res.send({
                    message: 'incorrect_password'
                });
            }

            
        });


    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});


module.exports = router;