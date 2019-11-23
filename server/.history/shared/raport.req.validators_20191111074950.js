const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'get':
            validators = [ 
              query('console_id', 'Name must exist').exists(),
              query('hour', 'Hour must exist').exists(),
              query('minute', 'Minute must exist').exists(),
            ];   
            break;                 
      }
      return validators;
    }
}
module.exports = Validators;
