const mongoose = require("mongoose")
const crypto = require("crypto");


const UserSchema = mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password:{type: String, required: [true, "can't be blank"]},
    Favorites:[String],
    salt: String,
})


UserSchema.pre("save", function(next) {
    this.salt = crypto.randomBytes(20).toString("hex");
    this.password = this.hashPassword(this.password);
    next()
    });

    UserSchema.methods.hashPassword = function(password) {
    return crypto.createHmac("Sha1", this.salt).update(password).digest("hex");}



const User = mongoose.model('User', UserSchema)


User.prototype.validPassword = function(passwordEnLogin) {
    
    console.log("PASSWORD INGRESANDO", this.hashPassword(passwordEnLogin))
    console.log("---------------------------------------------")
    console.log("PASSWORD DB", this.password)

    return this.password === this.hashPassword(passwordEnLogin)}

module.exports = User