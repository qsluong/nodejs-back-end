var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: String,
    password: String
});

var Account = mongoose.model('account', AccountSchema);

module.exports = Account;