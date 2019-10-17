const express = require('express');
const router = express.Router();
var machineId = require('machine-id');

/*
 Routes for post and get local machine mac address
*/

router.get('/', function (req, res, next) {
    let error = new Error();
    res.send({
        mac: machineId(true)
    });
    // getmac.getMac(function(err, macAddress) {
    //     if (err)  {
    //         error.status = 500;
    //         next(err);
    //     }
        
    // });
});

router.post('/', function (req, res, next) {
    
});

module.exports =  router;