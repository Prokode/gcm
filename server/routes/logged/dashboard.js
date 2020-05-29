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
var ventesStatistics = (ventes) =>{
    var postes = [];
    var consoles = [];
    var vente_total_cost = 0;
    ventes.forEach((vente) => {
        var posteChecked = false;
        var consoleChecked = false;
        vente_total_cost = vente_total_cost + vente.cost;
        postes.forEach((posteData, id) => {
            if (posteData.poste._id === vente.poste._id) {
                posteChecked = id;
            }
        });
       consoles.forEach((consol, id) => {
            if (consol.console._id === vente.console._id) {
                consoleChecked = id;
            }
       });

       if (posteChecked === false) {
            postes.push({
                poste: vente.poste,
                total: Number(vente.tarif.cost)
            });
       } else {
           postes[posteChecked].total = postes[posteChecked].total + Number(vente.tarif.cost);
       }

       if (consoleChecked === false) {
            consoles.push({
                console: vente.console,
                total: Number(vente.tarif.cost)
            });
        } else {
            consoles[consoleChecked].total = consoles[consoleChecked].total + Number(vente.tarif.cost);
        }

    });

    return {
        postes: postes.sort(function(a, b) {
                return b.total - a.total;
        }),
        consoles: consoles.sort(function(a, b) {
                return b.total -  a.total;
        }),
        total_cost: vente_total_cost,
        count: ventes.count()
    }
}
/*
 Routes for raport
*/

router.get('/report', raportReqValidators.validate('get_raport'), function (req, res, next) {
    let error = new Error();
    try {

        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        Vente.find({}).sort({ created_at: -1 }).exec(function (err, ventes) {
           if(err) {
            error.status = 500;
            next(error);
           }
            res.send({
                    message: 'success',
                    ventes: ventes,
                    stats: ventesStatistics(ventes)
            });
        });   

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


module.exports = router;