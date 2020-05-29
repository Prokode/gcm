const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const { validationResult } = require('express-validator');
const userReqValidators = require('../../shared/user.req.validators');
const User = require('../../shared/db/models/User');
const router = express.Router();
const phash = require('password-hash');

const generateRandomString = function() {
    let s = Math.floor(100000 + Math.random() * 900000);
    return s.toString();
}

/*
 Routes for post and get local machine mac address
*/
router.get('/show', function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        let id = req.query.id ? req.query.id : req.user.user_id;
        
        User.findOne({_id: id}, function(err, user) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
                return;
            }

            res.send(user);
        });


    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});

router.post('/create', userReqValidators.validate('createUser'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

            const body = _.pick(req.body, ['username', 'password', 'lastname', 'firstname', 'role']);
            const user = new User({ firstname: body.firstname, lastname: body.lastname,
                 username: body.username, password: phash.generate(body.password), role: body.role});

            user.save(function(err) {
                if (err) {
                    error.status = 500;
                    error.message = err;
                    next(error);
                    return;
                } else {
                    res.send({
                    message : 'success'
                    });
                }
            });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

router.put('/update', userReqValidators.validate('updateUser'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

            const body = _.pick(req.body, ['lastname', 'firstname', '_id', 'society']);

            let where = {
                _id: body._id
            };
            
            let set = {
                lastname: body.lastname,
                firstname: body.firstname,
                society: body.society
            };

            User.update(where, {$set: set}, {}, function(err, num, user) {
                if (err) {
                    error.status = 500;
                    err.message = err;
                    next(error);
                    return;
                }
                res.send({
                    message: 'success'
                });
            });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        
        User.find({$or: [{ role: 'ADMIN' }, { role: 'AGENT' }]}).sort({ created_at: -1 }).exec(function(err, users) {
            if (err) {
                error.status = 500;
                next(error);
            }

            res.send({
                message: 'success',
                users: users
            });
        });
        
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }    
});

router.post('/disable', userReqValidators.validate('disable'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const body = _.pick(req.body, ['id']);
        
        let where = {
            _id: body.id
        };
           
        let set = {
            wasDisable: true
        }

        User.update(where, {$set: set}, {}, function(err, num, user) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
                return;
            }
            res.send({
                message: 'success'
            });
        })


    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});

router.post('/activate', userReqValidators.validate('activate'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const body = _.pick(req.body, ['id']);
        
        let where = {
            _id: body.id
        };
           
        let set = {
            wasDisable: false
        }

        User.update(where, {$set: set}, {}, function(err, num, user) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
                return;
            }
            res.send({
                message: 'success'
            });
        })


    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});


router.post('/password/reinit', userReqValidators.validate('password'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const body = _.pick(req.body, ['id']);

        const password_generate = generateRandomString();
        
        let where = {
            _id: body.id
        };
           
        let set = {
            password: phash.generate(password_generate)
        }

        User.update(where, {$set: set}, {}, function(err, num, user) {
            if (err) {
                error.status = 500;
                err.message = err;
                next(error);
                return;
            }
            res.send({
                message: 'success',
                password: password_generate
            });
        })


    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});


router.put('/password/change', userReqValidators.validate('passwordChange'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        const body = _.pick(req.body, ['oldPassword', 'password']);

        User.findOne({_id: req.user.user_id}, function(err, user) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
                return;
            }

            if (phash.verify(body.oldPassword, user.password)) {

                let where = {
                    _id: req.user.user_id
                };
                
                let set = {
                    password: phash.generate(body.password)
                }

                User.update(where, {$set: set}, {}, function(err, num, user) {
                    if (err) {
                        error.status = 500;
                        err.message = err;
                        next(error);
                        return;
                    }
                    res.send({
                        message: 'success'
                    });
                });

            } else {
                res.send({
                    message: 'wrong_password'
                })
            }
            
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }        
});





/* Validators */ 


router.get('/username/check', userReqValidators.validate('checkUsername'), function (req, res, next) {
    let error = new Error();
    try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            error.status = 400;
            error.message = errors.array();
            next(error);
            return;
        }

        User.find({}, function (err, users) {
            if(err) {
              error.status = 500;
              next(error);
            }
            if (!users.length) {
                res.send({
                    unused: true
                });
            } else {
                try { 
                    const dataFilt = users.filter(function(d) {
                        return d.username.toLowerCase() === req.query.username.toLowerCase();
                    });
                    
                    if (dataFilt.length === 0) {
                        res.send({
                            unused: true
                        });
                    } else {
                        res.send({
                            unused: false
                        });
                    }
                } catch(err) {
                    error.status = 500;
                    next(error);
                }
            }
        });    
    } catch(err) {
        error.status = 500;
        next(error);
    }
});


module.exports =  router;