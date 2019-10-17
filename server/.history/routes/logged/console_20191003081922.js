const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const consoleReqValidators = require('../../shared/console.req.validators');

const Console = require('../../shared/db/models/Console');
const Tarif = require('../../shared/db/models/Tarif');
/*
 Routes for consoles
*/

router.get('/show', consoleReqValidators.validate('show'), function (req, res, next) {
    let error = new Error();
    try {

        Console.findOne({_id:  req.query.id}, function(err, console) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(console);
        });

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

        console.log(req.user);

        const consoleObj = new Console({name: body.name, user_id: req.user.user_id});

        consoleObj.save(function(err) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: consoleObj._id
            });
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

        const body = _.pick(req.body, ['name', '_id']);
        
        let where = {
            _id: body._id
          };
           
        let set = {
            name: body.name,
            updated_at: new Date()
          }

        Console.update(where, {$set: set}, {}, function(err, num, console) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: console._id
            });
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

        const body = _.pick(req.body, ['console_id']);

        let where = {
            console_id: body.console_id
          };


        Tarif.remove(where, { multi: true }, function (err, num) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }

            where = {
                _id: body.console_id
              };

            Console.remove(where, {}, function(err, num) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }

                res.send({
                    message: 'success'
                });

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

router.get('/name/check',  consoleReqValidators.validate('checkName'),  function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
        }

        Console.find({}, function (err, consoles) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!consoles.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = consoles.filter(function(d) {
                        return d.name.toLowerCase() === req.query.name.toLowerCase();
                    });
                    
                    if (dataFilt.length === 0) {
                        res.send({
                            unused: true
                        });
                    } else {
                        res.send({
                            unused: false,
                            id: dataFilt[0]._id
                        });
                    }
                } catch(err) {
                    error.status = 500;
                    next(error);
                }
            }
        });
    } catch(err) {
        error.status = 500;
        next(error);
    }
});

module.exports =  router;