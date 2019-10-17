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
                ];   
            break;
        case 'show':
            validators = [ 
                query('id', 'Id must exist').exists(),
                ];   
            break;
                    
      }
      return validators;
    }
}
module.exports = Validators;
