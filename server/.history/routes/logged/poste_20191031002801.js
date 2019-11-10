const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');
const { validationResult } = require('express-validator');
const posteReqValidators = require('../../shared/poste.req.validators');

const Tarif = require('../../shared/db/models/Tarif');
const Console = require('../../shared/db/models/Console');
const Poste = require('../../shared/db/models/Poste');
const Posteact = require('../../shared/db/models/Posteact');

/*
Console promises
*/
var getConsolesPromise = (posteData) => {
    return new Promise(
        (resolve, reject) => {
            Console.find({_id: posteData.console_id}, (err, consoleData) => {
                if (err) {
                    reject();
                }
                resolve(consoleData);
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
        Poste.find({}, function(err, postesData) {
            if (err) {
                error.status = 500;
                next(error);
            }
    
        var postes = [];

        let promiseArr = postesData.map(function (posteData) {
            // return the promise to array
            return getConsolesPromise(posteData).then(
                (data) => {
                    postes.push({
                        poste: posteData,
                        console: data[0]
                    }); 
                   return;  
                }, (error) => {
                    error.status = 500;
                    next(error);
                }
            );
        });

        Promise.all(promiseArr).then(function(resultsArray) {
            res.send(postes.reverse());
        }).catch(function(err) {
            error.status = 500;
            next(error);
        });

    });    
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});

router.get('/show', posteReqValidators.validate('show'), function (req, res, next) {
    let error = new Error();
    try {
        const checkDB = globals.dbTableExist('consoles');
        if (!checkDB) {
            error.status = 500;
            next(error);
        } else { 
            db.search('consoles', globals.DB_PATH, 'id', req.query.id, (succ, data) => {
                if (succ) {
                    const console = data.map(
                        (d) => {
                            return {
                                id: d.id,
                                name: base64.decode(d.name),
                                createdAt: d.createdAt,
                                updatedAt: d.updatedAt
                            }
                        }
                    );  
                    res.send(console[0]);
                } else {
                    error.status = 500;
                    next(error);
                }
              });
        }
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.post('/create', posteReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['name', 'console_id', 'arduino_pin']);

        const posteObj = new Poste({name: body.name, 
            console_id: body.console_id, arduino_pin: body.arduino_pin, user_id: req.user.user_id});

        posteObj.save(function(err) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: posteObj._id
            });
        });
     
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.put('/update', posteReqValidators.validate('update'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const checkDB = globals.dbTableExist('consoles');

        if (!checkDB) {
            error.status = 500;
            next(error);
        }

        const body = _.pick(req.body, ['name', 'id']);
        
        let where = {
            "id": body.id
          };
           
          let set = {
            "name": base64.encode(body.name)
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

router.put('/delate', posteReqValidators.validate('delate'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const checkDB = globals.dbTableExist('consoles');

        if (!checkDB) {
            error.status = 500;
            next(error);
        }

        const body = _.pick(req.body, ['console_id']);
        let where = {
            "console_id": body.console_id
          };

        db.search('tarifs', globals.DB_PATH, 'console_id', body.console_id, (succ, data) => {
            if (succ) {
                db.deleteRow('tarifs', globals.DB_PATH, where, (succ, msg) => {
                    if (!succ) {
                        error.status = 500;
                        next(error);
                    } else {
                        where = {
                            "id": body.console_id
                          };
                          db.deleteRow('consoles', globals.DB_PATH, where, (succ, msg) => {
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
                    }
                });   
            } else {
                where = {
                    "id": body.console_id
                  };
                  db.deleteRow('consoles', globals.DB_PATH, where, (succ, msg) => {
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
            }
          }); 
        

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


/*
 Console Validators
*/

router.get('/name/resolve', function(req, res, next) {
    let error = new Error();
    try {
        Poste.find({}, function(err, postes) {
            if (err) {
                error.status = 500;
                next(error);
            }
            const newPosteName = 'POSTE ' + (postes.length ? (postes.length + 1) : 1);
            res.send(
                {
                    message: 'success',
                    name: newPosteName
                }
            );
        });
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

router.get('/arduino/pin/validate', posteReqValidators.validate('arduino_pin_validate'), function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.query, ['arduino_pin']);

        Poste.find({}, function(err, postes) {
            if (err) {
                error.status = 500;
                next(error);
            }
            let pin_is_valid = true;

            postes.forEach(poste => {
                if (poste.arduino_pin === body.arduino_pin) {
                    pin_is_valid = false;
                }
            });

            res.send(
                {
                    message: 'success',
                    isValid: pin_is_valid
                }
            );
        });
    } catch(err) {
        error.status = 500;
        next(error);
    }
});


router.get('/check/limitation', function(req, res, next) {
    let error = new Error();
    try {

        Posteact.find({}, function(err, posteacts) {
            if (err) {
                error.status = 500;
                next(error);
            }
            const posteact = posteacts[0];
            Poste.find({}, function(err, postes) {
                if (postes.length === posteact.nbre) {
                    res.send({
                        message: 'success',
                        limit: true
                    });
                }
            });
        })
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

module.exports =  router;