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
    const checkDB = globals.dbTableExist('activation');
   if (!checkDB) {
    res.send({
      unuse: true
    });
   } else {

   }
});

router.post('/', function (req, res, next) {
    
});

module.exports =  router;