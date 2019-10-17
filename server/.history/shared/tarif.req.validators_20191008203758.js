const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'checkTime':
            validators = [ 
              query('console_id', 'Name must exist').exists(),
              query('hour', 'Hour must exist').exists(),
              query('minute', 'Minute must exist').exists(),
            ];   
            break;
        case 'create':
            validators = [ 
                body('console_id', 'Console Id must exist').exists(),
                body('cost', 'Cost must exist').exists(),
                body('hour', 'Hour must exist').exists(),
                body('minute', 'Minute must exist').exists(),
            ];   
            break;
        case 'show':
            validators = [ 
                query('id', 'Id must exist').exists(),
            ];   
            break;
        case 'update':
            validators = [ 
                body('console_id', 'Console Id must exist').exists(),
                body('cost', 'Cost must exist').exists(),
                body('hour', 'hour must exist').exists(),
                body('minute', 'hour must exist').exists(),
                body('_id', 'hour must exist').exists(),
            ];   
            break;   
        case 'delate':
            validators = [ 
                body('console_id', 'Console Id must exist').exists(),
                body('_id', 'Id must exist').exists(),
            ];   
            break;                 
      }
      return validators;
    }
}
module.exports = Validators;
