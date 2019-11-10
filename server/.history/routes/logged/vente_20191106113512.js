const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const router = express.Router();

const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

const Vente = require('../../shared/db/models/Vente');
const Poste = require('../../shared/db/models/Poste');

/*
 Routes for consoles
*/

router.post('/create', consoleReqValidators.validate('create'), function (req, res, next) {
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

module.exports =  router;