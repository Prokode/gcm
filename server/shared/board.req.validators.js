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
        case 'checkIp':
            validators = [ 
                query('ip', 'Ip must exist').exists(),
            ];   
            break;    
        case 'checkCom':
            validators = [ 
                query('com', 'Com must exist').exists(),
            ];   
            break;     
        case 'create':
            validators = [ 
                body('name', 'Name must exist').exists(),
                body('operation_mode', 'Operation mode must exist').exists(),
                body('ip', 'Ip must exist').exists(),
                body('com', 'Com must exist').exists(), 
                body('comBaudRate', 'comBaudRate must exist').exists()
            ];   
            break;
        case 'test':
            validators = [
                body('ip', 'Ip must exist').exists(),
                body('com', 'Com must exist').exists(),
                body('comBaudRate', 'comBaudRate must exist').exists()
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
                body('operation_mode', 'Operation mode must exist').exists(),
                body('ip', 'Ip must exist').exists(),
                body('com', 'Com must exist').exists(),
                body('_id', 'Id must exist').exists(),
                body('comBaudRate', 'comBaudRate must exist').exists()
            ];   
            break;
        case 'delate':
            validators = [ 
                body('id', 'Board Id must exist').exists()
            ];   
            break;                  
      }
      return validators;
    }
}
module.exports = Validators;
