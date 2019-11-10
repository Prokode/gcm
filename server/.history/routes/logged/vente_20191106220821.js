const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const router = express.Router();
var uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

const Vente = require('../../shared/db/models/Vente');
const Poste = require('../../shared/db/models/Poste');

const app = require('../../server');



/*
 Routes for consoles
*/

router.post('/create', venteReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {

        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['poste', 'tarif']);

        const venteObj = new Vente({unid: uniqid.time(), poste: body.poste, 
            tarif: body.tarif, user_id: req.user.user_id, remaining_time: { hour: body.tarif.hour, minute: body.tarif.minute }});



    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }  
});

module.exports =  router;