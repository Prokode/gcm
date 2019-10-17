const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Global = require('../shared/globals');
const phash = require('password-hash');
const User = require('../models/User');
const Auth = require('../models/Auth');

// Local authentification stategy 

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, phone, password, cb) {
        return 
        
        
        User.findOne({phone: phone, _type: req.body.type})
           .then( function(user) {
               var error = new Error();
                if (user) {
                    if (!phash.verify(password, user.password)) {
                        error.status = 400;
                        error.message = 'Incorrect password'
                        return cb(error, false, null);
                    }
                    return cb(null, user, {message: 'success'});
                } else {
                    error.status = 400;
                    error.message = 'Incorrect phone';
                   return cb(error, false, null);
               }
          })
          .catch(function(err) {cb(err)});
    }
));

// request interceptor middleware for authentification 
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : Global.jwtSecret,
        passReqToCallback: true,
        ignoreExpiration: false
    },
    function (req, jwtPayload, cb) {
        //find the user in db.
        const token = req.headers.authorization.slice(7);
        User.findOne({unid: jwtPayload.unid}).then(user => {
                var error = new Error();
                if (user) {
                    return Auth.findOne({unid: jwtPayload.unid, token: token})
                        .then(auth => {
                            if (auth) {
                            return cb(null, auth);
                            } else {
                                error.status = 400;
                                return cb(error);
                            } 
                        })
                        .catch(err => {
                            return cb(err);
                    });
                } else {
                    error.status = 400;
                    return cb(error);
                }
            }).catch(err => {
            return cb(err);
        });
    }
));