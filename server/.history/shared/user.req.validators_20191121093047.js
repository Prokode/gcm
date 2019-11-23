const { body, query } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'createUser':
            validators = [
                body('firstname', 'Firstname must exist').exists(),
                body('lastname', 'Lastname must exist').exists(), 
                body('username', 'Username must exist').exists(),
                body('password', 'Password must exist').exists().isLength({ min: 8 }),
                body('role').optional()
              ];   
            break;
            case 'show':
              validators = [ 
                  query('id', 'Id must exist').exists(),
              ];   
              break;  
          case 'checkUsername':
            validators = [ 
                  query('username', 'Username must exist').exists()
                ];
            break;
      }
      return validators;
    }
}
module.exports = Validators;
