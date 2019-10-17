const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');
const Console = require('../../models/Console');
const { validationResult } = require('express-validator');
const consoleReqValidators = require('../../shared/console.req.validators');

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
            db.getAll('consoles', globals.DB_PATH, (succ, data) => {
                    
                if (!succ) {
                    error.status = 500;
                    next(error);
                }
                console.log(data);
                const consoles = data.map(
                    (d) => {
                        return {
                            id: d.id,
                            name: base64.decode(d.name),
                            createdAt: d.created_at,
                            updatedAt: d.updatedAt
                        }
                    }
                );
    
                res.send(consoles);
    
            });
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
        const checkDB = globals.dbTableExist('consoles');
        if (!checkDB) {
            res.send([]);
        } else {
            db.getAll('consoles', globals.DB_PATH, (succ, data) => {
                    
                if (!succ) {
                    error.status = 500;
                    next(error);
                }
                console.log(data);
                const consoles = data.map(
                    (d) => {
                        return {
                            id: d.id,
                            name: base64.decode(d.name),
                            createdAt: d.created_at,
                            updatedAt: d.updatedAt
                        }
                    }
                );
    
                res.send(consoles);
    
            });
        }
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

        const checkDB = globals.dbTableExist('consoles');

        if (!checkDB) {
            db.createTable('consoles',  globals.DB_PATH, (succ, msg) => {
                if (!succ) {
                  error.status = 500;
                  next(error);
                }
            });
        }

        const body = _.pick(req.body, ['name']);

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
                            unused: false
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