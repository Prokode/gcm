const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'get_raport':
            validators = [ 
              query('date_debut', 'Date début must exist').exists(),
              query('date_fin', 'Date fin must exist').exists(),
            ];   
            break;                 
      }
      return validators;
    }
}
module.exports = Validators;
