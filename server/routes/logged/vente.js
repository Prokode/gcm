const express = require('express');
const _ = require('lodash');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const globals = require('../../shared/globals');
const router = express.Router();
var uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const venteReqValidators = require('../../shared/vente.req.validators');

function buildUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl);
  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}

function fetchUrl(url, options) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const lib = parsedUrl.protocol === 'https:' ? https : http;
    const requestOptions = {
      method: options && options.method ? options.method : 'GET',
      headers: options && options.headers ? options.headers : {}
    };

    const req = lib.request(parsedUrl, requestOptions, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          text: async () => body,
          json: async () => JSON.parse(body)
        });
      });
    });

    req.on('error', reject);
    if (options && options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

function fetchGetJson(url, headers) {
  return fetchUrl(url, { headers: headers || {} });
}

function fetchPostJson(url, body, headers) {
  return fetchUrl(url, {
    method: 'POST',
    headers: Object.assign({'Content-Type': 'application/json'}, headers || {}),
    body: JSON.stringify(body)
  });
}

let Vente = require('../../shared/db/models/Vente');
let Poste = require('../../shared/db/models/Poste');
let Console = require('../../shared/db/models/Console');
const Board = require('../../shared/db/models/Board');

var io = require('../../app_inits').io;

var Stopwatch = require('timer-stopwatch');
var msToTime = require('pretty-ms');
const jwt = require('jsonwebtoken');
var five = require("johnny-five");

const {
    EtherPortClient
} = require('etherport-client');

var onOff = (board_id, board_pin, action) => {
    return new Promise(
        (resolve, reject) => {
            Board.findOne({_id: board_id}, async function(err, board) {
                if (err) {
                    reject(err);
                    return;
                }

                const url = buildUrlWithParams('http://' + board.ip + ':3030/onoff', {
                    pin: board_pin,
                    action: action
                });

                fetchGetJson(url)
                .then(async function (response) {
                    if (!response.ok) {
                      const errorText = await response.text();
                      reject(new Error(`HTTP ${response.status}: ${errorText}`));
                      return;
                    }
                    const data = await response.json();
                    resolve({ data });
                })
                .catch(function (error) {
                    reject(error);
                });
            });
        });    
}


// https://github.com/rwaldron/johnny-five/wiki/Getting-Started#trouble-shooting {port: 'COM9'}
var fiveBoards;
var boardConnected = false;

Board.find({}).sort({ created_at: -1 }).exec(function (err, boards) {
    if (err) {
        error.status = 500;
        next(error);
    }
    if (boards.length > 0) {
        var ports = boards.filter((board) => {
            return board.operation_mode === 'com';
        }).map(
            (board) => {
                return { 
                    id:  board._id,
                    port: `COM${board.com}`,
                    repl: false}
            }
        );

        if (ports.length > 0) {
            fiveBoards = new five.Boards(ports)
            .on("ready", function() {
                console.log("Boards are ready");
            });
            // .on("fail", function(event) {
            //     console.log("%s sent a 'fail' message: %s", event.class, event.message);
            // })
            // .on("close", function(event) {
            //     console.log("%s Close: %s", event.class, event.message);
            // })
            // .on("error", function(event) {
            //     console.log("%s Error: %s", event.class, event.message);
            // });
        }

    }
});

// do {

//     try {

//         board = new five.Board({port: new EtherPortClient({
//             host: '192.168.43.35',
//             port: 3030
//           }),
//           repl: false
//         });

//         board.on("ready", function () {
//             console.log("board ready");
//             boardConnected = true;
//         });

//         board.on("fail", function(event) {
//             console.log("%s sent a 'fail' message: %s", event.class, event.message);
//             boardConnected = false;
//         });

//         boardConnected = true;

//     } catch(e) {
//         console.log('Board exception error');
//         console.log(e);
//         boardConnected = false;
//     }


// } while( !boardConnected );

// var board;
function NewVenteObj(temps, vente ) {
    console.log(vente);

    var timerOptions = {
        refreshRateMS: 1000,    // How often the clock should be updated 
        almostDoneMS: 0,  // When counting down - this event will fire with this many milliseconds remaining on the clock 
    }
    // new five.Led(Number(vente.poste.arduino_pin));
    
    // this.tele = new five.Led({
    //     board: fiveBoards.byId(vente.poste.board_id),
    //     pin: Number(vente.poste.arduino_pin),
    // });
  
        
        if (vente.poste.hasOwnProperty('board')) {
            this.poste = vente.poste;
            this.tele = vente.poste.board.operation_mode === 'ip' ? vente.poste : new five.Led({
                board: fiveBoards.byId(vente.poste.board._id),
                pin: Number(vente.poste.arduino_pin),
            });
        } else {
            this.poste = vente.vente.poste;
            this.tele = vente.vente.poste.board.operation_mode === 'ip' ? vente.vente.poste : new five.Led({
                board: fiveBoards.byId(vente.vente.poste.board._id),
                pin: Number(vente.vente.poste.arduino_pin),
             });
        }
        
    
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

                Board.findOne({_id: body.poste.board_id}, function(err, boardData) {
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
                            board: boardData,
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
        // ).sort({ created_at: -1 }).exec(

        Vente.find(findOptions, (err, ventes) => {
            if(err) {
                error.status = 500;
                next(error);
                return;
            }

            ventes.reverse();

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

router.put('/stop_vente', venteReqValidators.validate('stopVente'), function (req, res, next) {
    let error = new Error();
    try {
        
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                error.status = 400;
                error.message = errors.array();
                next(error);
                return;
            }

            const body = _.pick(req.body, ['vente_id']);

            let where = {
                _id: body.vente_id
              };
               
            let set = {
                wasStop: true
              }
            Vente.update(where, {$set: set}, {}, function(err, num, vente) {
                if (vente.wasStop) {
                    res.send({
                        message: 'success',
                        vente: vente
                    });
                }   
            }); 

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }         
});


// Socket communication block
io.on('connection', async function (socket) {
    console.log('on connection');
    var games = [];
    socket.on('start_chrono', async function(venteObj) { 
        console.log(venteObj);
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
        if (gameFiltered.length > 0) {
            console.log('Time 1');
            newVente = gameFiltered[0];
            var new_time_to_count_down =  parseInt(newVente.showValueTime()) + time_to_count_down;
            newVente.resetTime(new_time_to_count_down); 
            games[current_game_id] = newVente;
        } else {
            console.log('Time 2');
            newVente = new NewVenteObj(time_to_count_down, venteObj);
            games.push(newVente);
        }

        console.log(newVente);
        
        // console.log('--------');
        // games.forEach(g => {
        //     console.log(g.vente.poste.name + '---' +  msToTime(g.showValueTime()));
        // });

        newVente.timeChange().onTime(function() { 
            // console.log(newVente.vente.poste.name);
            // console.log(msToTime(newVente.showValueTime()));
            newVente.ident++;
            if (newVente.ident === 30) {
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

        newVente.timeChange().onDone(async function() {
            if (newVente.poste.board.operation_mode === 'ip') {
                await onOff(newVente.tele.board._id, newVente.tele.arduino_pin, 'off')
                .then(function (response) {
                        console.log(response.data);
                        io.emit('broadcast', {
                            message: 'clock_end',
                            poste: newVente.vente.poste
                        });
                    })
                    .catch(function (error) {
                        // handle error
                        console.log("error");
                        console.log(error.response);
            
                    });
            } else if (newVente.poste.board.operation_mode === 'com') {

                newVente.tele.off();
                io.emit('broadcast', {
                    message: 'clock_end',
                    poste: newVente.vente.poste
                });
        
            }           
        });
            // newVente.tele.off();
           
            // socket.dispatch('clock_end', {
            //     poste: newVente.vente.poste
            // })
        // });

        // newVente.tele.on();
        // On tele request

        if (newVente.poste.board.operation_mode === 'ip') {

            await onOff(newVente.tele.board._id, newVente.tele.arduino_pin, 'on')
            .then(function (response) {
                    console.log(response.data);
                    newVente.startTime();
                })
                .catch(function (error) {
                    // handle error
                    console.log("error");
                    console.log(error.response);
        
                });
            
        } else if (newVente.poste.board.operation_mode === 'com') {

            newVente.tele.on();
            newVente.startTime();

        }     

        

        
    });

    socket.on('stop_chrono', async function(poste) {
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
            };

            Vente.update(where, {$set: set}, {}, async function(err, num, vente) {
                if (vente.wasStop) {
                    if (gameFiltered[0].poste.board.operation_mode === 'ip') {
                        await onOff(gameFiltered[0].tele.board._id, gameFiltered[0].tele.arduino_pin, 'off')
                        .then(function (response) {
                            console.log(response.data);
                            io.emit('broadcast', {
                                message: 'clock_end',
                                poste: poste
                            });
                        })
                        .catch(function (error) {
                            // handle error
                            console.log("error");
                            console.log(error.response);
                
                        });
                    } else if (gameFiltered[0].poste.board.operation_mode === 'com') {
                        gameFiltered[0].tele.off();
                        io.emit('broadcast', {
                            message: 'clock_end',
                            poste: poste
                        });
                    }    
                    
                }   
            });   
           
        }
    });

    socket.on('simple_on', async function(poste) {

        Board.findOne({_id: poste.board_id}, async function(err, board) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }

            console.log(board.operation_mode);

      
            if (board.operation_mode === 'ip') {
                await onOff(poste.board_id, poste.arduino_pin, 'on')
                        .then(function (response) {
                                console.log(response.data);
                                socket.emit('simple_on_success', poste);
                            })
                            .catch(function (error) {
                                // handle error
                                console.log("error");
                                console.log(error.response);
                    
                            });
            } else if (board.operation_mode === 'com') {
                let tele = new five.Led({
                    board: fiveBoards.byId(poste.board_id),
                    pin: Number(poste.arduino_pin),
                });
                tele.on();
                socket.emit('simple_on_success', poste);
            }                
        
        });

    });

    socket.on('simple_off',async function(poste) {
        Board.findOne({_id: poste.board_id}, async function(err, board) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }

            if (board.operation_mode === 'ip') {
                await onOff(poste.board_id, poste.arduino_pin, 'off')
                .then(function (response) {
                                console.log(response.data);
                                socket.emit('simple_off_success', poste);
                })
                .catch(function (error) {
                                // handle error
                                console.log("error");
                                console.log(error.response);
                    
                });
            } else if (board.operation_mode === 'com') {
                let tele = new five.Led({
                    board: fiveBoards.byId(poste.board_id),
                    pin: Number(poste.arduino_pin),
                });
                tele.off();
                socket.emit('simple_off_success', poste);
            }

        });    

    });

});    

module.exports =  router;