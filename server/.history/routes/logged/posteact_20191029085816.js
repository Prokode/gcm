const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();

const Posteact = require('../../shared/db/models/Posteact');

/*
 Routes for poste activation
*/

router.get('/details', function (req, res, next) {
    let error = new Error();
    try {

        Posteact.find({}, function(err, posteact) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(posteact);
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});

router.get('/posteact', function (req, res, next) {
    let error = new Error();
    try {

        Posteact.find({}, function(err, posteact) {
            if (err) {
                error.status = 500;
                error.message = err;
                next(error);
            }
            res.send(posteact);
        });

    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});



// router.get('/list', function (req, res, next) {
//     let error = new Error();
//     try {
//         Console.find({}).sort({ created_at: -1 }).exec(function (err, consoles) {
//             if (err) {
//                 error.status = 500;
//                 next(error);
//             }
//             res.send(consoles);
//         });
//     } catch(err) {
//         error.status = 500;
//         error.message = err;
//         next(error);
//     }      
// });




// router.post('/create', consoleReqValidators.validate('create'), function (req, res, next) {
//     let error = new Error();
//     try {
//         const errors = validationResult(req); 
//         if (!errors.isEmpty()) {
//             error.status = 400;
//             error.message = errors.array();
//             next(error);
//         }

//         const body = _.pick(req.body, ['name']);

//         const consoleObj = new Console({name: body.name, user_id: req.user.user_id});

//         consoleObj.save(function(err) {
//             if (err) {
//                 error.status = 500;
//                 error.message = err;
//                 next(error);
//             }
//             res.send({
//                 message: 'success',
//                 id: consoleObj._id
//             });
//         });

//     } catch(err) {
//         error.status = 500;
//         error.message = err;
//         next(error);
//     }      
// });


// router.put('/update', consoleReqValidators.validate('update'), function (req, res, next) {
//     let error = new Error();
//     try {
//         const errors = validationResult(req); 
//         if (!errors.isEmpty()) {
//             error.status = 400;
//             error.message = errors.array();
//             next(error);
//         }

//         const body = _.pick(req.body, ['name', '_id']);
        
//         let where = {
//             _id: body._id
//           };
           
//         let set = {
//             name: body.name,
//             updated_at: new Date(),
//             user_id: req.user.user_id
//           }

//         Console.update(where, {$set: set}, {}, function(err, num, console) {
//             if (err) {
//                 error.status = 500;
//                 err.message = err;
//                 next(error);
//             }
//             res.send({
//                 message: 'success',
//                 id: console._id
//             });
//         });   

//     } catch(err) {
//         error.status = 500;
//         error.message = err;
//         next(error);
//     }      
// });

module.exports =  router;