const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },

});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
