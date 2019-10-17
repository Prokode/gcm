const express = require('express');
const _ = require('lodash');
const getmac = require('getmac');
const globals = require('../../shared/globals');
const router = express.Router();

/*
 Routes for post and get local machine mac address
*/

router.get('/username/check', function (req, res, next) {
    let error = new Error();
    const checkDB = globals.dbTableExist('users');
   if (!checkDB) {
        res.send({
            unused: true
        });
   } else {
    db.search('users', globals.DB_PATH, 'username', req.params.username, (succ, data) => {
        if (succ) {
            res.send({
                unused: false
            });
        } else (!succ) {
            res.send({
                unused: true
            });
        }
      });
   }
});

router.post('/', function (req, res, next) {
    
});

module.exports =  router;