const express = require('express');
const _ = require('lodash');
var base64 = require('base-64'); 
const globals = require('../../shared/globals');
const router = express.Router();
const db = require('electron-db');

const { validationResult } = require('express-validator');
const tarifReqValidators = require('../../shared/tarif.req.validators');


const Console = require('../../shared/db/models/Console');
const Tarif = require('../../shared/db/models/Tarif');

/*
Tarifs promises
*/
var getTarifsPromise = (consoleData) => {
    return new Promise(
        (resolve, reject) => {
            Tarif.find({console_id: consoleData._id}, (err, tarifsData) => {
                if (err) {
                    reject();
                }
                resolve(tarifsData);
            });
        }
    )
}
/*
 Routes for consoles
*/

router.get('/list', function (req, res, next) {

}