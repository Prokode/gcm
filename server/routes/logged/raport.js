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
const moment = require('moment');

/*
 Promises functions
*/
var filtre_par_poste = (ventes, poste_id) => {
    var results = []
    return new Promise(
        (resolve, reject) => {
            if (ventes.length > 0) {
                ventes.forEach((vente, id) => {
                    if (vente.poste._id === poste_id) {
                        results.push(vente);
                    }
                    if (id === (ventes.length - 1)) {
                        resolve(results);
                    }
                });
            } else {
                resolve(results);
            }    
        }
    );
}

var filtre_par_user = (ventes, user_id) => {
    var results = []
    return new Promise(
        (resolve, reject) => {
            if (ventes.length > 0) {
                ventes.forEach((vente, id) => {
                    if (vente.user_id === user_id) {
                        results.push(vente);
                    }
                    if (id === (ventes.length - 1)) {
                        resolve(results);
                    }
                });
            } else {
                resolve(results);
            }    
        }
    );
}

var filtre_par_console = (ventes, console_id) => {
    var results = [];
        return new Promise(
            (resolve, reject) => {
                if (ventes.length > 0) {
                    ventes.forEach((vente, id) => {
                        if (vente.console._id ===  console_id) {
                            results.push(vente);
                        }
                        if (id === (ventes.length - 1)) {
                            resolve(results);
                        }
                    });
                } else {
                    resolve(results);
                }
            }
        );
}

var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        // console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }

    dates.unshift(startDate);
    dates.push(endDate);

    return dates;
  };

var getVenteTotauxPromise = (findOptions) => {
    return new Promise(
        (resolve, reject) => {
            Vente.find(findOptions).sort({ created_at: -1 }).exec((err, ventes) => {
                if(err) {
                    error.status = 500;
                    next(error);
                    return;
                }
                var totalCost = 0;
                    // console.log(ventes);
                ventes.forEach((vente) => {
                    totalCost = totalCost + Number(vente.tarif.cost);
                });
                resolve(totalCost);
            });
        }
    );
}
/*
 Get Vente totals statistics
*/
var orderByCost = function(a, b) {
    if (a.total && b.total) {
        return a.total - b.total;
    }
    return 1;
}
var ventesStatistics = (ventes) =>{
    var postes = [];
    var consoles = [];
    ventes.forEach((vente) => {
        var posteChecked = false;
        var consoleChecked = false;

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
        })
    }
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
            return;
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
            return;
           }
           if (query.filtre_par === 'null') {
                res.send({
                    message: 'success',
                    ventes: ventes,
                    query: query,
                    stats: ventesStatistics(ventes)
                });
           } else {
                if (query.filtre_par === 'Console') {
                    filtre_par_console(ventes, query.filtre_console).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query,
                                stats: ventes.length > 0 ? ventesStatistics(ventes) : {postes: [], consoles: []}
                            });
                        }
                    )
                } else if (query.filtre_par === 'Poste') {
                    filtre_par_poste(ventes, query.filtre_poste).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query,
                                stats: ventes.length > 0 ? ventesStatistics(ventes) : {postes: [], consoles: []}
                            });
                        }
                    )
                } else if (query.filtre_par === 'Utilisateur') {
                    filtre_par_user(ventes, query.filtre_user).then(
                        (ventes) => {
                            res.send({
                                message: 'success',
                                ventes: ventes,
                                query: query,
                                stats: ventes.length > 0 ? ventesStatistics(ventes) : {postes: [], consoles: []}
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

router.get('/dashboard', raportReqValidators.validate('dashboard'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: false
        }, globals.jwtSecret);

        const query = _.pick(req.query, ['type']);

        var periodBegin = moment().startOf('isoWeek').toDate();
        // var periodEnd = moment().endOf('isoWeek').toDate();
        var periodEnd = new Date();

        if (query.type === 'month') {
            periodBegin = moment().startOf('month').toDate();
            // periodEnd = moment().endOf('month').toDate();
        }

        var days = [];
        var totaux = [];
        var reports = [];
        var costtotal = 0;
        var periodDays = enumerateDaysBetweenDates(periodBegin, periodEnd); 

        let promiseArr = periodDays.map((day) => {
            const date_debut = new Date(day);
            const date_fin = new Date(day);

            date_debut.setHours(0);
            date_debut.setMinutes(0);
            date_debut.setSeconds(0);

            date_fin.setHours(23);
            date_fin.setMinutes(59);
            date_fin.setSeconds(59);

            const findOptions = user.role === 'ADMIN' ? {
                created_at: { $lte: new Date(date_fin), $gte: new Date(date_debut)}
            } : {
                created_at: { $lte: new Date(date_fin), $gte: new Date(date_debut)},
                user_id: req.user.user_id
            };
            // return the promise to array
            return getVenteTotauxPromise(findOptions).then(
                (data) => {
                    costtotal = costtotal + Number(data);
                    reports.push({
                        totaux: data,
                        day: day.getDate()
                    }); 
                    return;  
                }, (error) => {
                    error.status = 500;
                    next(error);
                }
            );
        });

        Promise.all(promiseArr).then(function(resultsArray) {
            (reports.sort(function(a, b) {
                return a.day - b.day;
            })).forEach(
                (report) => {
                    totaux.push(report.totaux);
                    days.push(report.day);
                }
            );
            res.send({
                message: 'success',
                days: days,
                totaux: totaux,
                total: costtotal
            });
        }).catch(function(err) {
            error.status = 500;
            next(error);
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    

});
module.exports = router;