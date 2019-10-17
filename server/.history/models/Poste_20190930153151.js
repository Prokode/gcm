var uniqid = require('uniqid');
var base64 = require('base-64');
function Poste(arduino_pin, console_id, id=uniqid.time(), createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.arduino_pin = base64.encode(arduino_pin;
    this.console_id = console_id;
    this.id = id;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Poste;