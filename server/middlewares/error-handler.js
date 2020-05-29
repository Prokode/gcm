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
        res.status(err.status).send(err);
    } else {
        res.status(500).send(err);
    }
};

module.exports = errorHandler;