var uniqid = require('uniqid');
function Auth(userId, token, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.userId = userId;
    this.token = token
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Auth;