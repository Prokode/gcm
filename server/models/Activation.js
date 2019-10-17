var uniqid = require('uniqid');
function Activation(token, createdAt=new Date(), delatedAt=null, updatedAt=null) {
    this.id = uniqid.time();
    this.token = token;
    this.createdAt = createdAt;
    this.delatedAt = delatedAt;
    this.updatedAt = updatedAt; 
}

module.exports = Activation;