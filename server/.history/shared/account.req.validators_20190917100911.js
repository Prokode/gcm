const { body, q } = require('express-validator/check')
// app.use(expressValidator())
exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('username', 'Username must exist').exists(),
        body('password', 'Password must exist').exists(),
        body('role').optional()
       ]   
    }
  }
}

// in controller
/*
try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
*/