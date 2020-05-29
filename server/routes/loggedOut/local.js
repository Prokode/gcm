const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const localReqValidators = require('../../shared/local.req.validators');
const Local = require('../../shared/db/models/Local');
const router = express.Router();

/*
 Routes for post and get local machine mac address
*/

router.post('/currentDateTime', localReqValidators.validate('currentDateTime'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        Local.remove({}, {multi: true}, function (err, numRemoved) {
            if (err) {
              error.status = 500;
              error.message = err;
              next(error);
              return;
            }
            const body = _.pick(req.body, ['cdt']);
            const local = new Local({currentDateTime: body.cdt !== 'null' ? new Date(body.cdt):new Date()});
            local.save(function(err) {
              if (err) {
                error.status = 500;
                error.message = err;
                next(error);
                return;
              }
              res.send({
                message : 'success'
              });
            });
        });
        
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

router.get('/configs', function (req, res, next) {
    let error = new Error();
    try {

        Local.find({}, function(err, locals) {
            if(err) {
                error.status = 500;
                next(error);
                return;
            }
            if (locals.length) {
                const cdt = locals[0];
                const time_check = (cdt.currentDateTime).getTime() < (new Date()).getTime();

                if (time_check) {

                    let where = {
                        _id: cdt._id
                    };
                    
                    let set = {
                        currentDateTime: new Date()
                    }
            
                    Local.update(where, {$set: set}, {}, function(err, num, poste) {
                        if (err) {
                            error.status = 500;
                            err.message = err;
                            next(error);
                            return;
                        }
                        res.send({
                            message: 'correct'
                        });
                    });
                } else {
                    res.send({
                        message: 'wrong'
                    });
                }
            } else {
                res.send({
                    message: 'correct'
                });
            }
            
        })

    } catch(err) {
        error.status = 500;
        next(error);
    }
    
});


module.exports =  router;