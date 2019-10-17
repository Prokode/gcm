var uniqid = require('uniqid');
function User(name, role, password, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.name = name;
    this.role = role;
    this.password = password;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = User;