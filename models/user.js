var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String
});

var User = mongoose.model('user', UserSchema);

module.exports = User;