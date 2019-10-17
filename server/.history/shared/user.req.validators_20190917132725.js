const { body, query } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      switch (method) {
          case 'createUser': {
          return [ 
              body('username', 'Username must exist').exists(),
              body('password', 'Password must exist').exists().min ,
              body('role').optional()
            ]   
          };
          break;
          case 'checkUsername': {
              return [ 
                  query('username', 'Username must exist').exists()
                ]   
              };
          break;
      }
    }
}
module.exports = Validators;

// in controller
/*
try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
*/