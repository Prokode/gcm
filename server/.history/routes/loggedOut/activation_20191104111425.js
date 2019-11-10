const express = require('express');
const _ = require('lodash');
const db = require('electron-db');
const globals = require('../../shared/globals');
const router = express.Router();
const jwt = require('jsonwebtoken');
var Activation = require('../../shared/db/models/Activation');
const nodeMachineId = require('node-machine-id');
const { validationResult } = require('express-validator');
const activationReqValidators = require('../../shared/activation.req.validators');

/*
 Routes for post and get activaton Detail locallly
*/

router.get('/', function (req, res, next) {
  var error = new Error();
  Activation.find({}, function (err, activations) {
      if(err) {
        error.status = 500;
        next(error);
      }
      if (!activations.length) {
        res.send({
          message: 'unactivated'
        });
      } else {
        try {
          const token = activations.reverse()[0].token;
          const tokenCheck = jwt.verify(token, globals.ACTIVATION_KEY, {ignoreExpiration: false});
          if (tokenCheck) {
            const macAddress = nodeMachineId.machineIdSync({original: true});
            const activation = jwt.decode(token, {json: true});
              if (activation.activation.mac === macAddress) {
                res.send({
                  message: 'activated',
                  token: token
                });
              } else {
                res.send({
                  message: 'unactivated'
                });
              }
          }
        } catch (e) {
          if (e.name === 'TokenExpiredError') {
            res.send({
              message: 'activation exprired'
            });
          } else {
            res.send({
              message: 'unactivated'
            });
          }
        }
      }
  });
});


router.post('/create', activationReqValidators.validate('create'),  function (req, res, next) {
  var error = new Error();
  try{
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      error.status = 400;
      error.message = errors.array();
      next(error);
    }

    const body = _.pick(req.body, ['token']);

    const activation = new Activation({token: body.token});

    Activation.remove({}, {}, function (err, numRemoved) {
      if (err) {
        error.status = 500;
        error.message = err;
        next(error);
      }
      
    });

    activation.save(function(err) {
      if (err) {
        error.status = 500;
        error.message = err;
        next(error);
      }
      res.send({
        message : 'success'
      });
    });

    // db.clearTable('activation',  globals.DB_PATH, (succ, msg) => {
    //   if (succ) {
    //       db.insertTableContent('activation', globals.DB_PATH, activation, (succ, msg) => {
    //         if (!succ) {
    //         error.status = 500;
    //         next(error);
    //       } else {
    //         res.send({
    //           message : 'success'
    //         });
    //       }
    //     });
    //   } else {
    //     error.status = 500;
    //     next(error);
    //   }
    // });

  } catch(err) {
    error.status = 500;
    error.message = err;
    next(error);
  }  
});

module.exports =  router;
