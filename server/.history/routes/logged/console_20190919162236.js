const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');
/*
 Routes for authentification
*/

router.get('/list', function (req, res, next) {
    let error = new Error();
    try {
        const checkDB = globals.dbTableExist('consoles');
        console.log(checkDB);
        if (!checkDB) {
            res.send([]);
        } else {
            db.getAll('consoles', globals.DB_PATH, (succ, data) => {
                    
                if (!succ) {
                    error.status = 500;
                    next(error);
                }
                console.log(data);
                const consoles = data.map(
                    (d) => {
                        return {
                            id: d.id,
                            name: base64.decode(d.name),
                            createdAt: d.created_at,
                            updatedAt: d.updatedAt
                        }
                    }
                );
    
                res.send({
                    consoles: consoles
                });
    
            });
        }
    } catch(err) {
            error.status = 500;
            error.message = err;
            next(error);
    }      
});

module.exports =  router;