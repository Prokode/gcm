const globals = require("../shared/globals");

// Confirm that the token can make request to the API

const appIdentity = function(req, res, next) {
    console.log('app identity');
    
    const api_id = req.header('x-app-id');
    // console.log(api_id);
    var error = new Error();
        if (api_id) {
            if (api_id !== globals.APP_ID) {
                error.status = 403;
                next(error);
            }
            next();
        } else {
            error.status = 403;
            next(error);
        }
};

module.exports = appIdentity;