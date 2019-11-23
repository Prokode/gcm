const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const raportReqValidators = require('../../shared/raport.req.validators');
const Vente = require('../../shared/db/models/Vente');

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

        const query = _.pick(req.query, ['date_debut', 'date_fin']);

        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: true
        }, globals.jwtSecret);

        const findOptions = user.role === 'ADMIN' ? {
            created_at: {$gte: query.date_debut, $lte: query }
        } : {
            user_id: req.user.user_id
        };

        Vente.find({ "humans.genders": { $gt: 5 } }, function (err, docs) {
            // docs contains Omicron Persei 8, whose humans have more than 5 genders (7).
          });

       

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


module.exports = router;