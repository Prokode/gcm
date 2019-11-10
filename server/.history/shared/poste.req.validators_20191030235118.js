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
                body('name', 'Name must exist').exists(),
                body('console_id', 'Console Id must exist').exists(),
                body('arduino_pin', 'Arduino Pin must exist').exists(),
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
        case 'delate':
            validators = [ 
                body('console_id', 'Console Id must exist').exists()
            ];   
            break;      
        case 'arduino_pin_validate':  
            validators = [ 
                query('arduino_pin', ' must exist').exists(),
            ];   
            break;             
      }
      return validators;
    }
}
module.exports = Validators;
