var uniqid = require('uniqid');
function Auth(userId, token, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.username = base64.encode(username);
    this.role = base64.encode(role);
    this.password = pwdhash.generate(password);
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Auth;