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
    
            res.send(postes);
        });

        var postes = [];

        let promiseArr = postesData.map(function (posteData) {
            // return the promise to array
            return getConsolesPromise(posteData).then(
                (data) => {
                    postes.push({
                        poste: posteData,
                        console: data
                    }); 
                   return;  
                }, (error) => {
                    error.status = 500;
                    next(error);
                }
            );
        });

        Promise.all(promiseArr).then(function(resultsArray) {
            res.send(s);
        }).catch(function(err){
            error.status = 500;
            next(error);
        })

        const checkDB = globals.dbTableExist('postes');
        if (!checkDB) {
            res.send([]);
        } else {
            db.getAll('postes', globals.DB_PATH, (succ, data) => {
                    
                if (!succ) {
                    error.status = 500;
                    next(error);
                }

                const postes = data.reverse().map(
                    (d) => {
                        return db.search('consoles', globals.DB_PATH, 'id', d.console_id, (succ, data) => {
                            if (succ) {
                                const console = {
                                    id: data[0].id,
                                    name: base64.decode(data[0].name)
                                };
                                return {
                                    id: d.id,
                                    name: base64.decode(d.name),
                                    console: console,
                                    arduino_pin: base64.decode(d.arduino_pin),
                                    createdAt: d.createdAt,
                                    updatedAt: d.updatedAt
                                }
                            }
                            //  else {
                            //     error.status = 500;
                            //     next(error);
                            // }
                          });
                        
                    }
                );
    
                res.send(postes);
    
            });
        }
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

        const checkDB = globals.dbTableExist('postes');

        if (!checkDB) {
            db.createTable('postes',  globals.DB_PATH, (succ, msg) => {
                if (!succ) {
                  error.status = 500;
                  next(error);
                }
            });
        }

        const body = _.pick(req.body, ['name','console_id']);

        const console = new Console(body.name, req.user.userId);

        db.insertTableContent('consoles', globals.DB_PATH, console, (succ, msg) => {
            if (!succ) {
            error.status = 500;
            next(error);
          } else {
            res.send({
                message: 'success',
                id: console.id
            });
          }
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

router.get('/name/check',  posteReqValidators.validate('checkName'),  function(req, res, next) {
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
            res.send({
                unused: true
            });
        } else {
            db.getAll('consoles', globals.DB_PATH, (succ, data) => {
                
                if (!succ) {
                    error.status = 500;
                    next(error);
                }
                try { 
                    const dataFilt = data.filter(function(d) {
                        return base64.decode(d.name).toLowerCase() === req.query.name.toLowerCase();
                    });
                    
                    if (dataFilt.length === 0) {
                        res.send({
                            unused: true
                        });
                    } else {
                        res.send({
                            unused: false,
                            id: dataFilt[0].id
                        });
                    }
                } catch(err) {
                    error.status = 500;
                    next(error);
                }
                
            });
        }
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

module.exports =  router;