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

const app = express();

// app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-app-id,x-auth-token');
      if ( req.method === 'OPTIONS' ) {
        res.send(200);
      } else {
        next();
      }
   // next();
});

// passport for authentification and request authentification
require('./middlewares/passport');

// body-parser
app.use(bodyParser.json());

// routes 
// logged_out_routes
app.use('/logged-out', [AppIdentity], loggedOut);

// auth_out_routes
app.use('/auth', [AppIdentity], auth);

// logged routes
app.use('/logged', [passport.authenticate('jwt', {session: false})], logged);

// Error handler middlewares
app.use(ErrorHandler);

// app.use(expressValidator())

app.listen(8080, function() {
    /* process.env.port || */
    console.log('ready to accept request on localhost:8080/');
});

module.exports = app;