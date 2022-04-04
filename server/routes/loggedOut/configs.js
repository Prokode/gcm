const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
var Activation = require('../../shared/db/models/Activation');

const Tarif = require('../../shared/db/models/Tarif');
const Console = require('../../shared/db/models/Console');
const Poste = require('../../shared/db/models/Poste');
const Posteact = require('../../shared/db/models/Posteact');
const Board = require('../../shared/db/models/Board');

const User = require('../../shared/db/models/User');
const phash = require('password-hash');
const _ = require('lodash');

const { validationResult } = require('express-validator');
const configsReqValidators = require('../../shared/configs.req.validators');

/*
 Routes for get configs
*/

router.post('/restore', configsReqValidators.validate('restore'),  async function (req, res, next) {
    var error = new Error();
    let configs = {};

    let posteacts = _.pick(req.body, ['posteact']);
    let consoles = _.pick(req.body, ['consoles']);
    let tarifs = _.pick(req.body, ['tarifs']);
    let postes = _.pick(req.body, ['postes']);
    let boards = _.pick(req.body, ['boards']);

    posteacts = posteacts.posteact;

    consoles = consoles.consoles;

    tarifs = tarifs.tarifs;

    postes = postes.postes;
    
    boards = boards.boards;


          // Post activation
          await new Promise(
            (resolve, reject) => {
              posteacts.forEach(async (pstact, id) => {
                const posteact = new Posteact(pstact);
                await new Promise(
                  (resolve, reject) => {
                    posteact.save(function(err) {
                      if (err) {
                          error.status = 500;
                          error.message = err;
                          next(error);
                          return;
                      }
                      resolve();
                    });
                });    
                if (id === (posteacts.length - 1)) {
                  resolve();
                }
            });
            }
          );


          // Consoles  
          await new Promise(
            (resolve, reject) => {
              consoles.forEach(async (cons, id) => {
                const console = new Console(cons);
                await new Promise(
                  (resolve, reject) => {
                    console.save(function(err) {
                      if (err) {
                          error.status = 500;
                          error.message = err;
                          next(error);
                          return;
                      }
                      resolve();
                    });
                });    
                if (id === (consoles.length - 1)) {
                  resolve();
                }
            });
            }
          );
          
          

          // Tarifs  
          await new Promise(
            (resolve, reject) => {
              tarifs.forEach( async (tar, id) => {
                const tarif = new Tarif(tar);
                await new Promise(
                  (resolve, reject) => {
                    tarif.save(function(err) {
                      if (err) {
                          error.status = 500;
                          error.message = err;
                          next(error);
                          return;
                      }
                      resolve();
                    });
                });    
                if (id === (tarifs.length - 1)) {
                  resolve();
                }
            });
            }
          );
          


          // Postes  
          await new Promise(
            (resolve, reject) => {
              postes.forEach( async (pst, id) => {
                const poste = new Poste(pst);
                await new Promise(
                  (resolve, reject) => {
                    poste.save(function(err) {
                      if (err) {
                          error.status = 500;
                          error.message = err;
                          next(error);
                          return;
                      }
                      resolve();
                    });
                });    
                if (id === (postes.length - 1)) {
                  resolve();
                }
            });
            }
          );


          // Postes  
          await new Promise(
            (resolve, reject) => {
              boards.forEach( async (brd, id) => {
                const board = new Board(brd);
                await new Promise(
                  (resolve, reject) => {
                    board.save(function(err) {
                      if (err) {
                          error.status = 500;
                          error.message = err;
                          next(error);
                          return;
                      }
                      resolve();
                    });
                });    
                if (id === (boards.length - 1)) {
                  resolve();
                }
            });
            }
          );


          res.send({
            'message': 'success'
          });


});  

module.exports = router;