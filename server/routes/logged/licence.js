const express = require('express');
const router = express.Router();
var Activation = require('../../shared/db/models/Activation');
const jwt = require('jsonwebtoken');
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
      if (activations.length) {
        const activation = (activations.reverse())[0];
        activation_decode = jwt.decode(activation.token, {json: true});
        res.send({
            created_at: activation.created_at,
            details: activation_decode
        }); 
      } else {
        error.status = 500;
        next(error);
      }
    });
});  

module.exports = router;