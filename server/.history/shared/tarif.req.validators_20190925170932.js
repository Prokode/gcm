const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'checkName':
            validators = [ 
              query('name', 'Name must exist').exists(),
            ];   
            break;
        case 'create':
            validators = [ 
                body('console_id', 'Console Id must exist').exists(),
                body('cost', 'Cost must exist').exists(),
                body('time', 'Time must exist').exists(),
            ];   
            break;
        case 'show':
            validators = [ 
                query('id', 'Id must exist').exists(),
            ];   
            break;
        case 'update':
            validators = [ 
                body('name', 'Name must exist').exists(),
                body('id', 'Id must exist').exists(),
            ];   
            break;   
        case 'update':
            validators = [ 
                    body('name', 'Name must exist').exists(),
                    body('id', 'Id must exist').exists(),
                ];   
                break;                 
      }
      return validators;
    }
}
module.exports = Validators;
