const express = require('express');
const router = express.Router();

/*
 Routes for board to test connection to the admin computer
*/

router.get('/', function (req, res, next) {
    console.log("Request from board");
    res.status(200).send({});
});


module.exports =  router;