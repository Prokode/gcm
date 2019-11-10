const { body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'post':
            validators = [ 
                body('username', 'Username must exist').exists(),
              ];   
            break; 
      }
      return validators;
    }
}
module.exports = Validators;
