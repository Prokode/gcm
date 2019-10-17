const errorHandler = function(err, req, res, next) {
    console.log(err);
    if (err.status) {
        var body = {
            status: err.status,
            message: err.message ? err.message : null
        };
        if (body.message === null || body.message === undefined) {
            switch (err.status) {
                case 500:
                    body.message = 'Internal server error';
                    break;
                case 404:
                    body.message = 'Not found';
                    break;
                case 403:
                    body.message = 'Unauthorized';
                    break;    
                case 400:
                    body.message = 'Bad form data';
                    break;
                default:
                    body.message = 'Unreachable error';
                    break;
            }
        }
        res.status(body.status).send({
            message: body.message,
            errors: err.errors ? err.errors : null
        });
    } else {
        res.status(500).send({
            message: err.stack,
            errors: err.errors ? err.errors : null
        });
    }
};

module.exports = errorHandler;