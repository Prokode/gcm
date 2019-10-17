var LinvoDB = require("linvodb3");

var modelName = "user";

var schema = {
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: null
    }
};

var options = { };

var User = new LinvoDB(modelName, schema, options); 
User..on('save', function(doc) { })
User.on('updated', function(user) { user.updated_at = new Date(); })

module.exports = User;