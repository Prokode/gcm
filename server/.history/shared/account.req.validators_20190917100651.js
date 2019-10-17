const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('username', 'userName doesn\'t exists').exists(),
        body('pass', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }
  }
}