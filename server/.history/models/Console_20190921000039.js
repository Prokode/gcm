var uniqid = require('uniqid');
var base64 = require('base-64'); 
function Console(name, userId, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.name = base64.encode(name);
    this.userId = base64.encode(userId);
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Console;