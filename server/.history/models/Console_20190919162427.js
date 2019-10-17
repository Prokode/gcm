var uniqid = require('uniqid');
function Console(name, userId, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.name = name;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Console;