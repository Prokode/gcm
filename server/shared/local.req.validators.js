const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'currentDateTime':
            validators = [ 
                body('cdt', 'Current Date Time must exist').exists(),
            ];   
            break;                 
      }
      return validators;
    }
}
module.exports = Validators;