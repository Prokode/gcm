const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');
const Console = require('../../shared/db/models/Console');
const { validationResult } = require('express-validator');
const consoleReqValidators = require('../../shared/console.req.validators');

/*
 Routes for consoles
*/

router.get('/show', consoleReqValidators.validate('show'), function (req, res, next) {
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



router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        Console.find({}).sort({ created_at: -1 }).exec(function (err, consoles) {
            if (err) {
                error.status = 500;
                next(error);
            }
            res.send(consoles);
        });
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});




router.post('/create', consoleReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        const body = _.pick(req.body, ['name']);

        const console = new Console({name: body.name, user_id: req.user.userId});

        console.save(function(err) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: console._id
            });
        })

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


router.put('/update', consoleReqValidators.validate('update'), function (req, res, next) {
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

router.put('/delate', consoleReqValidators.validate('delate'), function (req, res, next) {
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

router.get('/name/check',  consoleReqValidators.validate('checkName'),  function(req, res, next) {
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