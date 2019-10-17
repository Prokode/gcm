var uniqid = require('uniqid');
function Hour(console_id, price, value, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.console_id = console_id;
    this.COS= price;
    this.value = value;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Hour;