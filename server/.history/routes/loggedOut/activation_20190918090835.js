const express = require('express');
const _ = require('lodash');
const db = require('electron-db');
const globals = require('../../shared/globals');
const Activation = require('../../models/Activation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const getmac = require('getmac');
/*
 Routes for post and get activaton Detail locallly
*/

router.get('/', function (req, res, next) {
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
      try {
        const token = data.reverse()[0].token;
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nY21hbmFnZXIuY29tIiwiYXVkIjoiaHR0cDpcL1wvZ2NtYW5hZ2VyLmNvbSIsImlhdCI6MTU2Mzc1NDA0NSwibmJmIjoxNTYzNzU0MDQ1LCJleHAiOjE1NjM3NTQxNzUsImFjdGl2YXRpb24iOnsiZW5kIjoiMjAxOS0wNy0yMyIsImNvZGUiOiJHQ00yMDE5MDA2NTg5OSIsIm1hYyI6IkQ0LUJFLUQ5LTcyLTAwLTA4In19.LV9eJvU9bpe8rrjX2Ps3YaaADKERfjHb7Hg0ULURbU0";
        const tokenCheck = jwt.verify(token, globals.ACTIVATION_KEY, {ignoreExpiration: false});
        if (tokenCheck) {
          getmac.getMac(function(err, macAddress) {
            if (err)  {
                error.status = 500;
                next(err);
            }
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
          });
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
