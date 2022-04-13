const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

/*
for isEmail: use validator library 
npm install mongoose validator
*/
let userSchema = new Schema({
    displayName: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter your name']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter your email'],
        validate: [isEmail, 'Please enter a valid Email']
    },
    reservations: [],
    admin: Boolean,
    master:Boolean,
    token: String,
    expiration: Date,
    used: Number,
    profile: String
}, { timestamps: true });


const User = mongoose.model('hoteluser', userSchema);//collection name must be: users


module.exports.User = User;





