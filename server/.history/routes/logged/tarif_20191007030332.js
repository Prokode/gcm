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
 Routes for consoles
*/

router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        const checkDB = globals.dbTableExist('consoles');
        if (!checkDB) {
            res.send([]);
        } else {
            Console.find({}).sort({ created_at: -1 }).exec(function (err, consoles) {
                if (err) {
                    error.status = 500;
                    next(error);
                }
            });
            db.getAll('consoles', globals.DB_PATH, (succ, dataConsole) => {
                if (!succ) {
                    error.status = 500;
                    next(error);
                }
                var consoles = [];
                var tarifs = [];
                dataConsole.reverse().forEach(consol => {
                    db.search('tarifs', globals.DB_PATH, 'console_id', consol.id, (succ, dataTarifs) => {
                        if(succ) {
                            tarifs = dataTarifs.reverse().map((dt) => {
                                    return {
                                        id: dt.id,
                                        cost: base64.decode(dt.cost),
                                        time: base64.decode(dt.time),
                                        console_id: dt.console_id,
                                        createdAt: dt.createdAt
                                    }
                                } 
                            );
                        }
                    });
                    consoles.push(
                        {
                            console: {
                                name: base64.decode(consol.name),
                                id: consol.id
                            },
                            tarifs: tarifs
                        }
                    );

                });

                res.send(consoles);
    
            });
        }
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.get('/show', tarifReqValidators.validate('show'), function (req, res, next) {
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
            // db.getRows('consoles',  {
            //     id: 
            //   }, (succ, result) => {
                
            //   });
        }
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

        const checkDB = globals.dbTableExist('tarifs');

        if (!checkDB) {
            db.createTable('tarifs',  globals.DB_PATH, (succ, msg) => {
                if (!succ) {
                  error.status = 500;
                  next(error);
                }
            });
        }

        const body = _.pick(req.body, ['console_id', 'cost', 'time']);

        const tarif = new Tarif(body.console_id, body.cost, body.time, req.user.userId);

        db.insertTableContent('tarifs', globals.DB_PATH, tarif, (succ, msg) => {
            if (!succ) {
            error.status = 500;
            next(error);
          } else {
            res.send({
                message: 'success',
                id: tarif.id
            });
          }
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


router.put('/delate', tarifReqValidators.validate('delate'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const checkDB = globals.dbTableExist('tarifs');

        if (!checkDB) {
            error.status = 500;
            next(error);
        }

        const body = _.pick(req.body, ['id']);
        let where = {
            "id": body.id
          };
           
        db.deleteRow('tarifs', globals.DB_PATH, where, (succ, msg) => {
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



/*
 Tarif Validators
*/

router.get('/name/check',  tarifReqValidators.validate('checkName'),  function(req, res, next) {
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