// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Ensure the bio field is here
    bio: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Fields for password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model('User', UserSchema);
