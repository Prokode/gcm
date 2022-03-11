const { body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
          case 'restore':
            validators = [ 
                body('posteact', 'Poste activation must exist').exists(),
                body('consoles', 'Consoles must exist').exists(),
                body('tarifs', 'Tarifs must exist').exists(),
                body('postes', 'Postes must exist').exists()
              ];   
            break;
      }
      return validators;
    }
}

module.exports = Validators;
