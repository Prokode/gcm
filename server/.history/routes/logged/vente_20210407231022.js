const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const router = express.Router();
var uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

let Vente = require('../../shared/db/models/Vente');
let Poste = require('../../shared/db/models/Poste');
let Console = require('../../shared/db/models/Console');

var io = require('../../app_inits').io;

var Stopwatch = require('timer-stopwatch');
var msToTime = require('pretty-ms');
const jwt = require('jsonwebtoken');
var five = require("johnny-five");
// https://github.com/rwaldron/johnny-five/wiki/Getting-Started#trouble-shooting {port: 'COM9'}
var board;
try {
    board = new five.Board();
    board.on("ready", function() {
        console.log("board ready");
    });
} catch(e) {
    console.log(e);
}
// var board;
function NewVenteObj(temps, vente) {
    var timerOptions = {
        refreshRateMS: 1000,    // How often the clock should be updated 
        almostDoneMS: 0,  // When counting down - this event will fire with this many milliseconds remaining on the clock 
    }
    this.tele = new five.Led(Number(vente.poste.arduino_pin));
    this.ident = 0;
    this.vente = vente;
    this.countDown = new Stopwatch(temps, timerOptions);//new Timer({direction:'up',startValue:'00:00:00',showHours: true});
    this.startTime = function() { this.countDown.start(); }
    this.showValueTime = function() { return this.countDown.ms ;}
    this.stopTime = function() { this.countDown.stop(); }
    this.timeChange = function() { return this.countDown; }
    this.resetTime = function(val) { this.countDown.reset(val); }
}

/*
 Routes for consoles
*/

router.post('/create', venteReqValidators.validate('create'), function (req, res, next) {
    let error = new Error();
    try {
        
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                error.status = 400;
                error.message = errors.array();
                next(error);
                return;
            }

            const body = _.pick(req.body, ['poste', 'tarif']);

            Console.find({_id: body.poste.console_id}, function(err, consoleData) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                    return;
                }

                const venteObj = new Vente({
                    unid: uniqid.time(),
                    poste: {
                        name: body.poste.name,
                        arduino_pin: body.poste.arduino_pin,
                        _id: body.poste._id
                    },
                    console: consoleData[0], 
                    tarif: {
                        hour: body.tarif.hour,
                        minute: body.tarif.minute,
                        second: '00',
                        cost: body.tarif.cost,
                        _id: body.tarif._id
                    },
                    user_id: req.user.user_id,
                    remaining_time: { hour: body.tarif.hour, minute: body.tarif.minute },
                    created_at: new Date()
                });
    
                venteObj.save(function(err) {
                    if (err) {
                        error.status = 500;
                        error.message = err;
                        next(error);
                    }
                    res.send({
                        message: 'success',
                        vente: venteObj
                    });
                });
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
        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: false
        }, globals.jwtSecret);

        const date_debut = new Date();
        const date_fin = new Date();

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

        Vente.find(findOptions).sort({ created_at: -1 }).exec((err, ventes) => {
            if(err) {
                error.status = 500;
                next(error);
                return;
            }
            res.send({
                message: 'success',
                ventes: ventes
            });
        });
  
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }  
});


router.get('/not_finished', function (req, res, next) {
    let error = new Error();
    try {
        var user  = jwt.decode(req.user.token, {
            json: true,
            complete: false
        }, globals.jwtSecret);

        const date_debut = new Date();
        const date_fin = new Date();
        var notFinishedVentes = [];

        date_debut.setHours(0);
        date_debut.setMinutes(0);
        date_debut.setSeconds(0);

        date_fin.setHours(23);
        date_fin.setMinutes(59);
        date_fin.setSeconds(59);
            
        const findOptions = {
            created_at: { $lte: new Date(date_fin), $gte: new Date(date_debut)}
        };
        // : {
        //     created_at: { $lte: new Date(date_fin), $gte: new Date(date_debut)},
        //     user_id: req.user.user_id
        // };

        Vente.find(findOptions).sort({ created_at: -1 }).exec((err, ventes) => {
            if(err) {
                error.status = 500;
                next(error);
                return;
            }

            var i = 0;
            while(i <= (ventes.length - 1)) {
                if (!ventes[i].wasStop && (ventes[i].remaining_time.hour !== 0 || 
                    ventes[i].remaining_time.minute !== 0 || 
                    ventes[i].remaining_time.second !== 0)) {
                        notFinishedVentes.push(ventes[i]);
                }
                i++;
            }

            res.send({
                message: 'success',
                ventes: notFinishedVentes
            });
        });
  
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }  
});

router.post('/stop_vente', venteReqValidators.validate('stopVente'), function (req, res, next) {
    let error = new Error();
    try {
        
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                error.status = 400;
                error.message = errors.array();
                next(error);
                return;
            }

            const body = _.pick(req.body, ['vente_id', 'tarif']);

            let where = {
                _id: gameFiltered[0].vente._id
              };
               
            let set = {
                wasStop: true
              }
            Vente.update(where, {$set: set}, {}, function(err, num, vente) {
                if (vente.wasStop) {
                    gameFiltered[0].tele.off();
                    io.emit('broadcast', {
                        message: 'clock_end',
                        poste: poste
                    });
                    // socket.dispatch('clock_end', {
                    //     poste: poste
                    // });
                }   
            }); 

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }         
});


// Socket communication block
io.on('connection', function (socket) {
    console.log('on connection');
    var games = [];
    socket.on('start_chrono',function(venteObj) {
        const time_to_count_down = (parseInt(venteObj.tarif.hour) * 60 * 60 * 1000 ) +
         (parseInt(venteObj.tarif.minute) * 60 * 1000 ) + (parseInt(venteObj.tarif.second) * 1000 ); 

        var current_game_id = null;
        const gameFiltered = games.filter(
            (game, id) => {
                if (game.vente.poste._id === venteObj.poste._id) {
                    current_game_id = id;
                }
                return game.vente.poste._id === venteObj.poste._id;
            }
        );
        var newVente = null;
        if (gameFiltered.length) {
            newVente = gameFiltered[0];
            var new_time_to_count_down =  parseInt(newVente.showValueTime()) + time_to_count_down;
            newVente.resetTime(new_time_to_count_down); 
            games[current_game_id] = newVente;
        } else {
            newVente = new NewVenteObj(time_to_count_down, venteObj);
            games.push(newVente);
        }
        
        // console.log('--------');
        // games.forEach(g => {
        //     console.log(g.vente.poste.name + '---' +  msToTime(g.showValueTime()));
        // });

        newVente.timeChange().onTime(function() { 
            // console.log(newVente.vente.poste.name);
            // console.log(msToTime(newVente.showValueTime()));
            newVente.ident++;
            if (newVente.ident === 59) {
                // console.log('update base');
                const tm = new Date(newVente.showValueTime());
                let where = {
                    _id: newVente.vente._id
                  };
                   
                let set = {
                    remaining_time: { 
                        hour: tm.getHours() ? tm.getHours() : 0 ,
                        minute: tm.getMinutes() ? tm.getMinutes() : 0,
                        second: tm.getSeconds() ? tm.getSeconds() : 0
                    } 
                  }
                try {
                    Vente.update(where, {$set: set}, {}, function(err, num, vente) {
                        newVente.ident = 0;
                        // console.log(vente.remaining_time.minute);
                    });  
                } catch(e) {

                }
            }
            io.emit('broadcast', {
                message: 'clock_refresh',
                poste: newVente.vente.poste,
                tarif: newVente.vente.tarif,
                time: msToTime(newVente.showValueTime()),
                timems: newVente.showValueTime(),
                vente: newVente.vente
            });
        });

        newVente.timeChange().onDone(function() {
            newVente.tele.off();
            io.emit('broadcast', {
                message: 'clock_end',
                poste: newVente.vente.poste
            });
            // socket.dispatch('clock_end', {
            //     poste: newVente.vente.poste
            // })
        });
        newVente.tele.on();
        newVente.startTime();  
    });

    socket.on('stop_chrono',function(poste) {
        const gameFiltered = games.filter(
            (game) => {
                return game.vente.poste._id === poste._id;
            }
        );
        if (gameFiltered.length) {
            const gameFiltered2 = games.filter(
                (game) => {
                    return game.vente.poste._id !== poste._id;
                }
            );
            games = gameFiltered2;
            gameFiltered[0].stopTime();
            let where = {
                _id: gameFiltered[0].vente._id
              };
               
            let set = {
                wasStop: true
              }
            Vente.update(where, {$set: set}, {}, function(err, num, vente) {
                if (vente.wasStop) {
                    gameFiltered[0].tele.off();
                    io.emit('broadcast', {
                        message: 'clock_end',
                        poste: poste
                    });
                    // socket.dispatch('clock_end', {
                    //     poste: poste
                    // });
                }   
            });   
           
        }
    });

    socket.on('simple_on',function(poste) {
        let tele = new five.Led(Number(poste.arduino_pin));
        tele.on();
        socket.emit('simple_on_success', poste);
    });

    socket.on('simple_off',function(poste) {
        let tele = new five.Led(Number(poste.arduino_pin));
        tele.off();
        socket.emit('simple_off_success', poste);
    });

});    

module.exports =  router;