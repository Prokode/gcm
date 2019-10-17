var uniqid = require('uniqid');
function Post(arduino_pin, console_id, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.arduino_pin = arduino_pin;
    this.console_id = console_id;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Post;