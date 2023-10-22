
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstname:String,
    lastname:String,
    email: String,
    password: String,
    isverfied: Boolean,
  description: String,
});
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel
