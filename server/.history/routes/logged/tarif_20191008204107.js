const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const tarifReqValidators = require('../../shared/tarif.req.validators');


const Console = require('../../shared/db/models/Console');
const Tarif = require('../../shared/db/models/Tarif');

/*
Tarifs promises
*/
var getTarifsPromise = (consoleData) => {
    return new Promise(
        (resolve, reject) => {
            Tarif.find({console_id: consoleData._id}, (err, tarifsData) => {
                if (err) {
                    reject();
                }
                resolve(tarifsData);
            });
        }
    )
}
/*
 Routes for consoles
*/

router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        Console.find({}).sort({ created_at: -1 }).exec(function (err, consolesData) {
            if (err) {
                error.status = 500;
                next(error);
            }
            var consoles = [];
            var tarifs = [];
     
            let promiseArr = consolesData.map(function (consoleData) {
                // return the promise to array
                return getTarifsPromise(consoleData).then(
                    (data) => {
                        consoles.push({
                            console: consoleData,
                            tarifs: data
                        }); 
                       return;  
                    }, (error) => {
                        error.status = 500;
                        next(error);
                    }
                );
            });

            Promise.all(promiseArr).then(function(resultsArray) {
                res.send(consoles);
            }).catch(function(err){
                error.status = 500;
                next(error);
            })

             
        });
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.get('/show', tarifReqValidators.validate('show'), function (req, res, next) {
    let error = new Error();
    try {
        Tarif.findOne({_id: req.query.id}, function(err, tarif){
            if (err) {
                error.status = 500;
                next(error);
            }
            res.send(tarif);
        });
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});



router.post('/create', tarifReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['console_id', 'cost', 'hour', 'minute']);
        
        const tarifObj = new Tarif({console_id: body.console_id, cost: body.cost, hour: body.hour,
            minute: body.minute, user_id: req.user.userId});

        tarifObj.save(function(err) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: tarifObj._id
            });
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.put('/update', tarifReqValidators.validate('update'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['console_id', 'cost', 'hour', 'minute', '_id']);
        let where = {
            _id: body._id
          };
           
        let set = {
            hour: body.hour,
            updated_at: new Date(),
            user_id: req.user.user_id
          }
           
        db.updateRow('consoles', globals.DB_PATH, where, set, (succ, msg) => {
            if (!succ) {
                error.status = 500;
                next(error);
            } else {
                res.send({
                    message: 'success',
                    id: body.id
                });
            }
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.put('/delate', tarifReqValidators.validate('delate'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['_id']);

        let where = {
            "_id": body._id
          };
           
        Tarif.remove(where, { multi: false}, function (err, num) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }

            res.send({
                message: 'success'
            });

        });  

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});



/*
 Tarif Validators
*/

router.get('/time/check',  tarifReqValidators.validate('checkTime'),  function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }
        const query = _.pick(req.query, ['console_id', 'hour', 'minute']);

        Tarif.findOne({
            console_id: query.console_id,
            hour: query.hour,
            minute: query.minute
        }, function(err, tarif) {
            if (err) {
                error.status = 500;
                next(error);
            }
            if (tarif) {
                res.send({
                    exist: true
                })
            } else {
                res.send({
                    exist: false
                });
            }
        });

    } catch(err) {
        error.status = 500;
        next(error);
    }
});

module.exports =  router;