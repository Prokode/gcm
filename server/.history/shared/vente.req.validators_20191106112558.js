const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'create':
            validators = [ 
                body('poste_id', 'Poste id must exist').exists(),
                body('tarif',  must exist').exists(),
            ];   
            break;                
      }
      return validators;
    }
}
module.exports = Validators;
