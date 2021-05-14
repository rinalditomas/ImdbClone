const mongoose = require("mongoose")
const crypto = require("crypto");


const UserSchema = mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password:{type: String, required: [true, "can't be blank"]},
    favorites:[Object],
    salt: String,
})


const User = mongoose.model('User', UserSchema)

module.exports = User