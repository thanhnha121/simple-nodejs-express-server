var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    status: String,
    created_at: Date
}, { collection: 'user' });

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;