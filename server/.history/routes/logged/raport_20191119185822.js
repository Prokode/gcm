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
 Promises functions
*/
var filtre_par_poste = (ventes, poste_id) => {
    var results = []
    return new Promise(
        (resolve, reject) => {
            ventes.forEach((vente, id) => {
                if (vente.poste._id === poste_id) {
                    results.push(vente);
                }
                if (id === (ventes.length - 1)) {
                    resolve(results);
                }
            });

        }
    );
}

var filtre_par_user = (ventes, user_id) => {
    var results = []
    return new Promise(
        (resolve, reject) => {
            ventes.forEach((vente, id) => {
                if (vente.user_id === user_id) {
                    results.push(vente);
                }
                if (id === (ventes.length - 1)) {
                    resolve(results);
                }
            });

        }
    );
}

var filtre_par_console = (ventes, console_id) => {
    var results = []
    return new Promise(
        (resolve, reject) => {
            ventes.forEach((vente, id) => {
                if (vente.console._id ===  console_id) {
                    results.push(vente);
                }
                if (id === (ventes.length - 1)) {
                    resolve(results);
                }
            });

        }
    );
}

/*
 Get Vente totals statistics
*/
var ventesStatistics = (ventes) =>{
    var postes = [];
    var consoles = [];
    ventes.forEach((vente) => {
       postes.forEach(p)
    });
}
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

        const query = _.pick(req.query, ['date_debut', 'date_fin', 'filtre_console', 'filtre_poste', 'filtre_user', 'filtre_par']);

        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: false
        }, globals.jwtSecret);

        const date_debut = new Date(query.date_debut);
        const date_fin = new Date(query.date_fin);

        date_debut.setHours(0);
        date_debut.setMinutes(0);
        date_debut.setSeconds(0);

        date_fin.setHours(23);
        date_fin.setMinutes(59);
        date_fin.setSeconds(59);

        const findOptions = user.role === 'ADMIN' ? {
            created_at: { $lte: date_fin, $gte: new Date(date_debut)}
        } : {
            user_id: req.user.user_id,
            created_at: {$lte: new Date(query.date_fin), $gte: new Date(date_debut)}
        };

        Vente.find(findOptions).sort({ created_at: -1 }).exec(function (err, ventes) {
           if(err) {
            error.status = 500;
            next(error);
           }
           if (query.filtre_par === 'null') {
                res.send({
                    message: 'success',
                    ventes: ventes,
                    query: query
                });
           } else {
                if (query.filtre_par === 'Console') {
                    filtre_par_console(ventes, query.filtre_console).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query
                            });
                        }
                    )
                } else if (query.filtre_par === 'Poste') {
                    filtre_par_poste(ventes, query.filtre_poste).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query
                            });
                        }
                    )
                } else if (query.filtre_par === 'Utilisateur') {
                    filtre_par_user(ventes, query.filtre_user).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query
                            });
                        }
                    )
                }
           }
           
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


module.exports = router;