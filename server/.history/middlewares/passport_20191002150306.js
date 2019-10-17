const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const phash = require('password-hash');
const globals = require('../shared/globals');
const User = require('../shared/db/models/User');
const Auth = require('../shared/db/models/Auth');

// Local authentification stategy 

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, username, password, cb) {
        return User.find({username:  username}, function(err, users) {
            var error = new Error();
            if (err) {
                error.status = 500;
                cb(error);
            }
            try {
                if (!users.length) {
                    error.status = 400;
                    error.message = 'incorrect_username';
                    return cb(error, false, null);
                } else {
                    const user = users[0];
                    
                    if (!phash.verify(password, user.password)) {
                        error.status = 400;
                        error.message = 'incorrect_password'
                        return cb(error, false, null);
                    }
                    return cb(null, user, {message: 'success'});
                }
            } catch(err) {
                error.status = 500;
                cb(error);
            }
        });
        // db.getAll('users', globals.DB_PATH, (succ, data) => {
        //         var error = new Error();
        //         if (!succ) {
        //             error.status = 500;
        //             cb(error);
        //         }
        //         try { 
        //             const dataFilt = data.filter(function(d) {
        //                 return base64.decode(d.username) === username;
        //             });
        //             if (dataFilt.length === 0) {
        //                 error.status = 400;
        //                 error.message = 'incorrect_username';
        //                 return cb(error, false, null);
        //             } else {
        //                 const user = dataFilt[0];
        //                 if (!phash.verify(password, user.password)) {
        //                     error.status = 400;
        //                     error.message = 'incorrect_password'
        //                     return cb(error, false, null);
        //                 }
        //                 return cb(null, user, {message: 'success'});
        //             }
        //         } catch(err) {
        //             error.status = 500;
        //             next(error);
        //         }
        //     });
    }
));

// request interceptor middleware for authentification 
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : globals.jwtSecret,
        passReqToCallback : true,
        ignoreExpiration  : false
    }, function(req, jwtPayload, cb) {
        //find the user in db.
        var error = new Error();
        const token = req.headers.authorization.slice(7);

        return Auth.findOne({token: token}, function(err, auth) {
            if (err) {
                error.status = 500;
                cb(error);
            }
            try {
                if (!auth) {
                    error.status = 401;
                    return cb(error);
                } else {
                    const authPayLoad = auth; 
                    console.log(authPayLoad.delated_at);
                    console.log(jwtPayload.id);
                    if (authPayLoad.user_id === jwtPayload.id  && authPayLoad.active === 1) {
                        return cb(null, authPayLoad);
                    } else {
                        error.status = 401;
                        return cb(error);
                    }
                }
            } catch(err) {
                error.status = 500;
                cb(error);
            }
        })
        // return db.getRows('auths', globals.DB_PATH, {
        //     token: token
        //   }, (succ, result) => {
        //     if (succ) {
        //         const auth = result[0]; 
        //         if (auth.userId === jwtPayload.id && auth.delatedAt === null) {
        //             return cb(null, auth);
        //         } else {
        //             error.status = 401;
        //             return cb(error);
        //         }
        //     } else {
        //         error.status = 401;
        //         return cb(error);
        //     }
        //   });
    }
));