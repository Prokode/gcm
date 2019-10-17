const express = require('express');
const _ = require('lodash');
const db = require('electron-db');
const globals = require('../../shared/globals');
const router = express.Router();
const jwt = require('jsonwebtoken');
var Activation = require('../../shared/db/models/Activation');
var machineId = require('machine-id');
const activationReqValidators = require('../../shared/');
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
            const macAddress = machineId(true);
            const activation = jwt.decode(token, {json: true});
              if (activation.activation.mac === macAddress) {
                res.send({
                  message: 'activated'
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


router.post('/', function (req, res, next) {
  var error = new Error();


  const body = _.pick(req.body, ['token']);

  const activation = new Activation(body.token);

  db.clearTable('activation',  globals.DB_PATH, (succ, msg) => {
    if (succ) {
        db.insertTableContent('activation', globals.DB_PATH, activation, (succ, msg) => {
          if (!succ) {
          error.status = 500;
          next(error);
        } else {
          res.send({
            message : 'success'
          });
        }
      });
    } else {
      error.status = 500;
      next(error);
    }
  })
});

module.exports =  router;
