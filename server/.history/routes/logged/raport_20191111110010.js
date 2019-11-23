const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const raportReqValidators = require('../../shared/raport.req.validators');
const Vente = require('../../shared/db/models/Vente');
const jwt = require('jsonwebtoken');

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
            complete: false
        }, globals.jwtSecret);

        const findOptions = user.role === 'ADMIN' ? {
            // $and: [{ created_at: { $lte: new Date(query.date_fin)} }, { created_at: { $gte: new Date(query.date_debut) }}]
            created_at: { $lte: (new Date(query.date_fin)).setTime('23:59:59'), $gte: new Date(query.date_debut)}
        } : {
            user_id: req.user.user_id,
            // $and: [{ created_at: { $lte: new Date(query.date_fin)} }, { created_at: { $gte: new Date(query.date_debut) }}]
            created_at: {$lte: new Date(query.date_fin), $gte: new Date(query.date_debut)}
        };

        Vente.find(findOptions, function (err, ventes) {
           if(err) {
            error.status = 500;
            next(error);
           }

           res.send({
               message: 'success',
               ventes: ventes
           });
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


module.exports = router;