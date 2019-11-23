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

        console.log(query);

        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: true
        }, globals.jwtSecret);

        console.log(user);

        const findOptions = user.role === 'ADMIN' ? {
            created_at: {$gte: new Date(query.date_debut), $lte: new Date(query.date_fin)}
        } : {
            user_id: req.user.user_id,
            created_at: {$gte: new Date(query.date_debut), $lte: new Date(query.date_fin)}
        };

        console.log(findOptions);

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