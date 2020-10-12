const mongoose = require('mongoose');
var UsersSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String
});
var usersModel = mongoose.model('users', UsersSchema);
module.exports = usersModel;