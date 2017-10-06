const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    googleId: { type: String, required: true}, 
    accessToken: { type: String, required: true },
    displayName: {type: String},
    givenName: {type: String},
    // created: Date,
    // username: { type: String, required: true },
    // password: { type: String, required: true }   
});

const User = mongoose.model('users', userSchema);
module.exports = {User};