const express = require('express');
const _ = require('lodash');
const globals = require('../../shared/globals');
const router = express.Router();
var uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

const Vente = require('../../shared/db/models/Vente');
const Poste = require('../../shared/db/models/Poste');

const app = require('../../server');

var io = require('socket.io').listen(app);
var Stopwatch = require('timer-stopwatch');
var msToTime = require('pretty-ms');

var newVente = null;


function VenteObj(temps, poste) {
    var timerOptions = {
        refreshRateMS: 10,    // How often the clock should be updated 
        almostDoneMS: 0,  // When counting down - this event will fire with this many milliseconds remaining on the clock 
    }
    this.poste = poste;
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
        io.on('connection', function (socket) {
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                error.status = 400;
                error.message = errors.array();
                next(error);
            }

            const body = _.pick(req.body, ['poste', 'tarif']);

            const venteObj = new Vente({unid: uniqid.time(), poste: body.poste, 
                    tarif: body.tarif, user_id: req.user.user_id, remaining_time: { hour: body.tarif.hour, minute: body.tarif.minute }});
            const time_to_count_down = (parseInt(this.venteObj.tarif.hour) * 60 * 60 * 1000 ) +  (parseInt(this.venteObj.tarif.minute) * 60 * 1000 ); 
            
            newVente = new VenteObj(time_to_count_down, venteObj.poste);
            
            newVente.timeChange().onTime(function(){ 
                console.log(newVente.showValueTime());
            });

            newVente.timeChange().onDone(function(){

            });

            newVente.startTime();

            res.send();
        }); 
        
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }  
});


//Socket connection handler

  

module.exports =  router;