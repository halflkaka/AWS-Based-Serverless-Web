var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email : String,
    name : String,
    password: String
}, {
    collection : 'users'
});


var user = module.exports = mongoose.model('users', UserSchema);
