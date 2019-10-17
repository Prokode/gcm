const express = require('express');
const router = express.Router();
const nodeMachineId = require('node-machine-id');

/*
 Routes for post and get local machine mac address
*/

router.get('/', function (req, res, next) {
    let error = new Error();
    try {
        res.send({
            mac: machineId(true)
        });
    } catch(e) {
        error.status = 500;
        next(error);
    }
});

router.post('/', function (req, res, next) {
    
});

module.exports =  router;