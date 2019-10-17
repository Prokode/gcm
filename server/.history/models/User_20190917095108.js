var uniqid = require('uniqid');
function User(username, password, role, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.username = username;
    this.role = role;
    this.password = password;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = User;