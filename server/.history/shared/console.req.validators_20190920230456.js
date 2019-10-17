const { query } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'checkName':
            validators = [ 
                query('name', 'name must exist').exists(),
              ];   
            break;
      }
      return validators;
    }
}
module.exports = Validators;
