const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const router = express.Router();
var uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

const Vente = require('../../shared/db/models/Vente');
const Poste = require('../../shared/db/models/Poste');

var io = require('../../app_inits').io;

var Stopwatch = require('timer-stopwatch');
var msToTime = require('pretty-ms');


function NewVenteObj(temps, vente) {
    var timerOptions = {
        refreshRateMS: 1000,    // How often the clock should be updated 
        almostDoneMS: 0,  // When counting down - this event will fire with this many milliseconds remaining on the clock 
    }
    this.vente = vente;
    this.countDown = new Stopwatch(temps, timerOptions);//new Timer({direction:'up',startValue:'00:00:00',showHours: true});
    this.startTime = function() { this.countDown.start(); }
    this.showValueTime = function() { return this.countDown.ms ;}
    this.stopTime = function() { this.countDown.stop(); }
    this.timeChange = function() { return this.countDown; }
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
            }

            const body = _.pick(req.body, ['poste', 'tarif']);

            const venteObj = new Vente({
                unid: uniqid.time(),
                poste: {
                    name: body.poste.name,
                    arduino_pin: body.poste.arduino_pin,
                    _id: body.poste._id
                }, 
                tarif: {
                    hour: body.tarif.hour,
                    minute: body.tarif.minute,
                    cost: body.tarif.cost,
                    _id: body.tarif._id
                },
                user_id: req.user.user_id,
                remaining_time: { hour: body.tarif.hour, minute: body.tarif.minute } 
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
  
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }  
});

io.on('connection', function (socket) {
    console.log('on connection');
    var games = [];
    socket.on('start_chrono',function(venteObj) {
        const time_to_count_down = (parseInt(venteObj.tarif.hour) * 60 * 60 * 1000 ) +  (parseInt(venteObj.tarif.minute) * 60 * 1000 ); 
        const gameFiltered = games.filter(
            (game) => {
                return game.vente.poste._id === venteObj.poste._id;
            }
        );
        var newVente = null;
        if (gameFiltered.length) {
            newVente = gameFiltered[0];
            var new_time_to_count_down =  parseInt(newVente.showValueTime()) + time_to_count_down;
            newVente.timeChange().reset(new_time_to_count_down); 
        } else {
            newVente = new NewVenteObj(time_to_count_down, venteObj);
            games.push(newVente);
        }
        newVente.timeChange().onTime(function(){ 
            // console.log(newVente.vente.poste.name);
            // console.log(msToTime(newVente.showValueTime()));
            socket.emit('clock_refresh', {
                poste: newVente.vente.poste,
                time: msToTime(newVente.showValueTime())
            })
        });

        newVente.timeChange().onDone(function(){
            socket.emit('clock_end', {
                poste: newVente.vente.poste
            })
        });

        newVente.startTime();  
    });

    socket.on('stop_chrono',function(poste) {
        const gameFiltered = games.filter(
            (game) => {
                return game.vente.poste._id === poste._id;
            }
        );
        gameFiltered[0].
    });
});    

module.exports =  router;