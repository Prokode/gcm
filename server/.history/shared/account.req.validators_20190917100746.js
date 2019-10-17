const { body } = require('express-validator/check')
app.use(expressValidator())
exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('username', 'userName doesn\'t exists').exists(),
        body('password', 'Invalid email').exists(),
        body('role').optional()
       ]   
    }
  }
}