const mongoose = require('mongoose');
const { Schema } = mongoose;

//Creating a MongoDB Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;