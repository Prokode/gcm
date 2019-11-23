const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const raportReqValidators = require('../../shared/raport.req.validators');


/*
 Routes for raport
*/

router.get('/', raportReqValidators.validate('get_raport'), function (req, res, next) {
    let error = new Error();
    try {

        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        Poste.findOne({_id: req.query.id}, function(err, poste) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(poste);
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


module.exports = router;