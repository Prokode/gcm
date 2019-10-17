const express = require('express');
const _ = require('lodash');
const db = require('electron-db');
const globals = require('../../shared/globals');
// const Activation = require('../../models/Activation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const getmac = require('getmac');
var Activation = require('../../shared/db/models/Activation');
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
        
      }
  });
   const checkDB = globals.dbTableExist('activation');
   if (!checkDB) {
    res.send({
      message: 'unactivated'
    });
   } else {
    db.getAll('activation', globals.DB_PATH, (succ, data) => {
      if (!succ) {
        error.status = 500;
        next(error);
      }
      
  });
  }
});

router.post('/', function (req, res, next) {
  var error = new Error();
  const checkDB = globals.dbTableExist('activation');
  if (!checkDB) {
      db.createTable('activation',  globals.DB_PATH, (succ, msg) => {
          if (!succ) {
            error.status = 500;
            next(error);
          }
      });
  }

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
