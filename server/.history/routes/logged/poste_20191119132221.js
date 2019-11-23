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
        Poste.find({}).sort({ created_at: 1 }).exec(function(err, postesData) {
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
                        console: data.length ? data[0] : null
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

        const body = _.pick(req.body, ['console_id', 'arduino_pin', '_id']);
        
        let where = {
            _id: body._id
          };
           
        let set = {
            updated_at: new Date(),
            user_id: req.user.user_id,
            arduino_pin: body.arduino_pin,
            console_id: body.console_id
          }

        Poste.update(where, {$set: set}, {}, function(err, num, poste) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: poste._id
            });
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

router.get('/list/tarifs', function (req, res, next) {
    let error = new Error();
    
    try {
        Poste.find({}).sort({ created_at: 1 }).exec(function(err, postesData) {
            if (err) {
                error.status = 500;
                next(error);
            }
    
        var postes = [];

        let consolesPromiseArr = postesData.map(function (posteData) {
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
                   return;
                }
            );
        });

        

        Promise.all(consolesPromiseArr).then(function(resultsArray) {
            let posteTarifs = [];

            let tarifsPromiseArr = postes.map(function (posteData) {
                // return the promise to array
                if (posteData.Console !== null) {
                    return getTarifsPromise(posteData.console).then(
                        (data) => {
                            posteTarifs.push({
                                poste: posteData.poste,
                                console: posteData.console,
                                tarifs: data
                            }); 
                           return;  
                        }, (error) => {
                            error.status = 500;
                            next(error);
                        }
                    );
                } else {
                    posteTarifs.push({
                        poste: posteData.poste,
                        console: posteData.console,
                        tarifs: []
                    });
                    return; 
                }
                


            });

            Promise.all(tarifsPromiseArr).then(function(resultsArray) {

                res.send(posteTarifs);

            }).catch(function(err) {
                error.status = 500;
                next(error);
            });

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
            let used_pin_poste_id = null;

            postes.forEach(poste => {
                if (poste.arduino_pin === body.arduino_pin) {
                    pin_is_valid = false;
                    used_pin_poste_id = poste._id;
                }
            });

            res.send(
                {
                    message: 'success',
                    isValid: pin_is_valid,
                    used_pin_poste_id: used_pin_poste_id
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
                if (postes.length == posteact.nbre) {
                    res.send({
                        message: 'success',
                        limit: true
                    });
                } else {
                    res.send({
                        message: 'success',
                        limit: false
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