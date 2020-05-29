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
          case 'updateUser':
              validators = [
                  body('firstname', 'Firstname must exist').exists(),
                  body('lastname', 'Lastname must exist').exists(),
                  body('_id', 'User id must exist').exists()
                ];   
              break;  
          case 'disable':
              validators = [ 
                body('id', 'Id must exist').exists(),
              ];   
            break;
          case 'activate':
              validators = [ 
                body('id', 'Id must exist').exists(),
              ];   
            break;
          case 'password':
              validators = [ 
                body('id', 'Id must exist').exists(),
              ];   
            break;  
          case 'passwordChange':
              validators = [ 
                body('oldPassword', 'oldPassword must exist').exists(),
                body('password', 'oldPassword must exist').exists(),
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
