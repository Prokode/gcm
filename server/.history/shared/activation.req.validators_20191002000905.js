const { body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'create':
            validators = [ 
                body('token', 'Username must exist').exists(),
                body('password', 'Password must exist').exists()
              ];   
            break;
      }
      return validators;
    }
}
module.exports = Validators;
