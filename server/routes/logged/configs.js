const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
var Activation = require('../../shared/db/models/Activation');

const Tarif = require('../../shared/db/models/Tarif');
const Console = require('../../shared/db/models/Console');
const Poste = require('../../shared/db/models/Poste');
const Posteact = require('../../shared/db/models/Posteact');

const User = require('../../shared/db/models/User');
const phash = require('password-hash');
const _ = require('lodash');

/*
 Routes for get configs
*/

router.get('/', async function (req, res, next) {
    var error = new Error();
    let configs = {};

    const body = _.pick(req.query, ['password']);

    User.findOne({_id: req.user.user_id}, async function(err, user) {

      if (err) {
          error.status = 500;
          error.message = err;
          next(error);
          return;
      }
      
      if (phash.verify(body.password, user.password)) { 

          // Post activation
          await new Promise(
            (resolve, reject) => {
              Activation.find({}, function(err, activations) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }
                const activation = (activations.reverse())[0];
                activation_decode = jwt.decode(activation.token, {json: true});
                resolve(activation_decode.activation.code);
              });
            }
          ).then(
            (code) => {
              configs.code = code;
            }
          );
            

          // Post activation
          await new Promise(
            (resolve, reject) => {
              Posteact.find({}, function(err, posteact) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }
                resolve(posteact);
              });
            }
          ).then(
            (posteact) => {
              configs.posteact = posteact;
            }
          );

          // Consoles  
          await new Promise(
            (resolve, reject) => {
              Console.find({}, function(err, consoles) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }
                resolve(consoles);
              });
            }
          ).then(
            (consoles) => {
              configs.consoles = consoles;
            }
          );
          
          
          // Tarifs  
          await new Promise(
            (resolve, reject) => {
              Tarif.find({}, function(err, tarifs) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }
                resolve(tarifs);
              });
            }
          ).then(
            (tarifs) => {
              configs.tarifs = tarifs;
            }
          );


          // Postes  
          await new Promise(
            (resolve, reject) => {
              Poste.find({}, function(err, postes) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                }
                resolve(postes);
              });
            }
          ).then(
            (postes) => {
              configs.postes = postes;
            }
          );

          res.send(configs);


      } else {
        error.status = 400;
        error.message = 'Bad password';
        next(error);
      }

  });

});  

module.exports = router;