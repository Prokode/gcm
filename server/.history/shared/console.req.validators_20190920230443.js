const { query } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'chackName':
            validators = [ 
                query('username', 'Username must exist').exists(),
              ];   
            break;
      }
      return validators;
    }
}
module.exports = Validators;
