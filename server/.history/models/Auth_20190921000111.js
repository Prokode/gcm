var uniqid = require('uniqid');
var base64 = require('base-64'); 
function Auth(userId, token, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.userId = base64. userId;
    this.token = token;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Auth;