const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const boardReqValidators = require('../../shared/board.req.validators');

const Board = require('../../shared/db/models/Board');
const Console = require('../../shared/db/models/Console');
const Tarif = require('../../shared/db/models/Tarif');

/**Serial port**/
let serialport = require('serialport');

// ping
var ping = require ("net-ping");
var session = ping.createSession ();

/*
 Routes for boards
*/

router.get('/show', boardReqValidators.validate('show'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }
        
        Board.findOne({_id:  req.query.id}, function(err, board) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(board);
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
        Board.find({}).sort({ created_at: -1 }).exec(function (err, boards) {
            if (err) {
                error.status = 500;
                next(error);
            }
            res.send(boards);
        });
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.post('/test', boardReqValidators.validate('test'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        const body = _.pick(req.body, ['operation_mode', 'com', 'ip', 'comBaudRate']);


        if (body.operation_mode !== null && body.operation_mode !== undefined) {

            if (body.operation_mode === 'ip') {

                try {  

                    session.pingHost(`${body.ip}`, function (error, target) {
                        if (error) {
                            console.log (target + ": " + error.toString ());
                            res.status(400).send({
                                            success: false
                            });
                        } else {
                            console.log (target + ": Alive");
                            res.status(200).send({
                                success: true
                            });
                        }
                    });

                    // tcpp.probe(`${body.ip}`, 41234, function(err, available) {
                    //     if (!available) {
                    //         console.log (body.ip);
                    //         res.status(400).send({
                    //             success: false
                    //         });
                    //     }   
                    //     if (available) { 
                    //         res.status(200).send({
                    //             success: true
                    //         });
                    //     } 
                    // });
                        
            
                } catch(e) {
                    console.log('Board exception error');
                    console.log(e);
                    res.status(400).send({
                        success: false
                    });
                }
    
            } else if (body.operation_mode === 'com') {
                try {  

                    // Test for configured Com port
                    try {

                        let myPort = new serialport(`COM${body.com}`, body.comBaudRate);
                    
                        myPort.on(
                            'error', function() {
                                console.log("We have error");
                                res.status(400).send({
                                    success: false
                                });
                            } 
                        );
                    
                        myPort.on(
                            'open', function() {
                                console.log("Port open");
                                myPort.close(( err ) => {
                                    if (err) {
                                        console.log(err);
                                    }
        
                                    console.log('Port close');
                                });
                                res.status(200).send({
                                    success: true
                                });
                            }
                        );

                        
                    
                    } catch(e) {
                        console.log(e);
                        console.log("Can't open this port");
                        res.status(400).send({
                            success: false
                        });
                    }

                    
            
                } catch(e) {
                    console.log('Board exception error');
                    console.log(e);
                    boardConnected = false;
                    res.status(400).send({
                        success: false
                    });
                }
            }

        }

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});



router.post('/create', boardReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        const body = _.pick(req.body, ['name', 'operation_mode', 'com', 'ip']);

        const boardObj = new Board(body);

        boardObj.save(function(err) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send({
                message: 'success',
                id: boardObj._id
            });
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.put('/update', boardReqValidators.validate('update'), 
function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        const body = _.pick(req.body, ['name', 'operation_mode', 'com', 'ip']);

        // const boardObj = new Board(body);
        
        let where = {
            _id: body._id
        };
           
        let set = {
            name: body.name,
            operation_mode: body.operation_mode,
            com: body.com,
            ip: body.ip,
            updated_at: new Date()
        }

        Board.update(where, {$set: set}, {}, function(err, num, board) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
                return;
            }
            res.send({
                message: 'success',
                id: board._id
            });
        });   

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});


router.put('/delate', boardReqValidators.validate('delate'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
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
 Board Validators
*/


router.get('/ip/check',  boardReqValidators.validate('checkIp'),  function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        Board.find({}, function (err, boards) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!boards.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = boards.filter(function(d) {
                        return d.ip.toLowerCase() === req.query.ip.toLowerCase();
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

router.get('/com/check',  boardReqValidators.validate('checkCom'),  function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        Board.find({}, function (err, boards) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!boards.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = boards.filter(function(d) {
                        return d.com.toLowerCase() === req.query.com.toLowerCase();
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

router.get('/name/check',  boardReqValidators.validate('checkName'),  function(req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        Board.find({}, function (err, boards) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!boards.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = boards.filter(function(d) {
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