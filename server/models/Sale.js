var uniqid = require('uniqid');
function Sale(post_id, console_id, hour, user, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.post_id = post_id;
    this.console_id = console_id;
    this.hour = hour;
    this.user = user;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Sale;