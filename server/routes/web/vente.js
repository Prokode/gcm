const express = require('express');
const _ = require('lodash');
const router = express.Router();

const Tarif = require('../../shared/db/models/Tarif');
const Console = require('../../shared/db/models/Console');
const Poste = require('../../shared/db/models/Poste');

var getPosteNumber = (poste) => {
    return Number((poste.name.split(" "))[1]);
}
/*
Console promises
*/
var getConsolesPromise = (posteData) => {
    return new Promise(
        (resolve, reject) => {
            Console.find({_id: posteData.console_id}, (err, consoleData) => {
                if (err) {
                    reject();
                }
                resolve(consoleData);
            });
        }
    )
}

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


router.get('/poste/tarifs/list', function (req, res, next) {
    let error = new Error();
    
    try {
        Poste.find({wasDisable: false}).sort({ created_at: 1 }).exec(function(err, postesData) {
            if (err) {
                error.status = 500;
                next(error);
                return;
            }
    
        var postes = [];

        let consolesPromiseArr = postesData.map(function (posteData) {
            // return the promise to array
            return getConsolesPromise(posteData).then(
                (data) => {
                    if (data.length) {
                        postes.push({
                            poste: posteData,
                            console: data[0]
                        }); 
                    }
                   return;  
                }, (error) => {
                    error.status = 500;
                    next(error);
                }
            );
        });

        

        Promise.all(consolesPromiseArr).then(function(resultsArray) {
            let posteTarifs = [];

            let tarifsPromiseArr = postes.map(function (posteData) {
                // return the promise to array
                if (posteData.console !== null) {
                    return getTarifsPromise(posteData.console).then(
                        (data) => {
                            if (data.length) {
                                posteTarifs.push({
                                    poste: posteData.poste,
                                    console: posteData.console,
                                    tarifs: data
                                }); 
                            }
                           return;  
                        }, (error) => {
                            error.status = 500;
                            next(error);
                        }
                    );
                } else {
                    return; 
                }
            });

            Promise.all(tarifsPromiseArr).then(function(resultsArray) {

                posteTarifs.sort(function(a, b) {
                    return getPosteNumber(a.poste) - getPosteNumber(b.poste);
                });

                posteTarifs.forEach(
                    (poste) => {
                        poste.tarifs = poste.tarifs.sort(function(a, b) {
                            return a.cost - b.cost;
                        });
                    }
                );

                res.send(posteTarifs);

            }).catch(function(err) {
                error.status = 500;
                next(error);
            });

        }).catch(function(err) {
            error.status = 500;
            next(error);
        });

    });    
    } catch(err) {
        error.status = 500;
        error.message = err;
        next(error);
    }      
});

module.exports = router;