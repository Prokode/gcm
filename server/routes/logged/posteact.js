const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const { validationResult } = require('express-validator');
const posteactReqValidators = require('../../shared/posteact.req.validators');
const Posteact = require('../../shared/db/models/Posteact');

/*
 Routes for poste activation
*/

router.get('/detail', function (req, res, next) {
    let error = new Error();
    try {

        Posteact.find({}, function(err, posteact) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(posteact);
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});

router.post('/', posteactReqValidators.validate('post'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        const body = _.pick(req.body, ['nbre']);

        Posteact.find({}, function(err, posteact) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }

            let newNbre = posteact.length > 0 ? Number(posteact[0].nbre) + Number(body.nbre) : Number(body.nbre);


            Posteact.remove({}, {multi: true}, function (err, numRemoved) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                    return;
                }
                const posteact = new Posteact({nbre: newNbre});
                posteact.save(function(err) {
                    if (err) {
                        error.status = 500;
                        error.message = err;
                        next(error);
                        return;
                    }
                    res.send({
                        message: 'success'
                    });
                });
            });    


        });    

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});

module.exports =  router;