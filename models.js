const mongoose = require('mongoose');

const { Schema } = mongoose

const UserSchema = new Schema({
    username: String,
    photo: String
})

module.exports = mongoose.model('User', UserSchema)