const express = require('express');
// midellewares
const ErrorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');
const passport = require('passport');
const AppIdentity = require('./middlewares/appIdentity');


// Routes list per App
var loggedOut = require('./routes/loggedOut');
var auth = require('./routes/auth');
var logged = require('./routes/logged');

// db 
var LinvoDB = require("linvodb3");
const globals = require('./shared/globals');
LinvoDB.d = globals.DB_PATH;

// express app
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-app-id,x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
      if ( req.method === 'OPTIONS' ) { 
        res.send(200);
      } else {
        next();
      }
});

// passport for authentification and request authentification
require('./middlewares/passport');
// require('./shared/db/db');
// body-parser
app.use(bodyParser.json());

// routes 
// logged_out_routes
app.use('/logged-out', [AppIdentity], loggedOut);

// auth_out_routes
app.use('/auth', [AppIdentity], auth);

// logged routes
app.use('/logged', [AppIdentity, passport.authenticate('jwt', {session: false})], logged);

// Error handler middlewares
app.use(ErrorHandler);

app.listen(8080, function() {
    console.log('ready to accept request on localhost:8080/');
});

module.exports = app;