// express app
const express = require('express');
const app = require('./app_inits').app;


// http server
const server = require('./app_inits').server;


// midellewares
const ErrorHandler = require('./middlewares/error-handler');
const bodyParser = require('body-parser');
const passport = require('passport');
const AppIdentity = require('./middlewares/appIdentity');


// Routes list per App
var loggedOut = require('./routes/loggedOut');
var auth = require('./routes/auth');
var logged = require('./routes/logged');
var web = require('./routes/web');


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,authorization,x-app-id,x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
      if ( req.method === 'OPTIONS' ) { 
        res.sendStatus(200);
      } else {
        next();
      }
});

// passport for authentification and request authentification
require('./middlewares/passport');
// require('./shared/db/db');
// body-parser
app.use(bodyParser.json());

// static folder for web app
app.use('/asset', express.static(__dirname +'/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// routes 
// logged_out_routes
app.use('/logged-out', [AppIdentity], loggedOut);

// auth_out_routes
app.use('/auth', [AppIdentity], auth);

// logged routes
app.use('/logged', [AppIdentity, passport.authenticate('jwt', {session: false})], logged);

app.use('/web', [AppIdentity], web);

// Error handler middlewares
app.use(ErrorHandler);

// app.listen(8080, function() {
//     console.log('ready to accept request on localhost:8080/');
// });

// var server = require('http').Server(app);

// var io = require('socket.io')(server);

server.listen(8080, function() {
  console.log('ready to accept request on localhost:8080/');
});

// console.log(io);

module.exports = app;