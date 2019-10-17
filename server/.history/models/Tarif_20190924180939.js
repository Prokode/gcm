var uniqid = require('uniqid');
var base64 = require('base-64');
function Tarif(console_id, cost, time, id=uniqid.time(), user_id, createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.console_id = console_id;
    this.cost = base64.encode(cost);
    this.time = base64.encode(time);
    this.user_id = user_id;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = r;