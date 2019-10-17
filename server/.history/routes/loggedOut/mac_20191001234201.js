const express = require('express');
const _ = require('lodash');
const getmac = require('getmac');
const globals = require('../../shared/globals');
const router = express.Router();
var machineId = require('machine-id');

/*
 Routes for post and get local machine mac address
*/

router.get('/', function (req, res, next) {
    let error = new Error();
    getmac.getMac(function(err, macAddress) {
        if (err)  {
            error.status = 500;
            next(err);
        }
        res.send({
            mac: macAddress
        });
    });
});

router.post('/', function (req, res, next) {
    
});

module.exports =  router;