const express = require('express');
const path = require('path');
var cors = require('cors');
// midellewares
const ErrorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');
const AppIdentity = require('./middlewares/appIdentity');
// const expressValidator = require('express-validator')
// Routes list per App

var loggedOut = require('./routes/loggedOut');

const app = express();

// app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-app-id');
    if ('OPTIONS' === req.method) {
        res.send(200);
      } else {
        next();
      }
   // next();
});
// body-parser
app.use(bodyParser.json());
// routes 
app.use('/logged-out', [AppIdentity], loggedOut);

// Error handler middlewares
app.use(ErrorHandler);

// app.use(expressValidator())

app.listen(8080, function() {
    /* process.env.port || */
    console.log('ready to accept request on localhost:8080/');
});

module.exports = app;