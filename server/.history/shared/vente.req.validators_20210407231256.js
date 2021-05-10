const { query, body } = require('express-validator');
// 
const Validators = {
    validate: function(method) {
      var validators = null;
      switch (method) {
        case 'create':
            validators = [ 
                body('poste', 'Poste must exist').exists(),
                body('tarif', 'Tarif must exist').exists(),
            ];
          break;     
        case 'stopVente':
            validators = [ 
              body('vente_id', 'Vente id must exist').exists()
            ];
          break;                 
      }
      return validators;
    }
}

module.exports = Validators;
