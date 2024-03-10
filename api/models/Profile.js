const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    about: {
        type: String,
    },
    instagram: {
        type: String,
    },
    phone: {
        type: Number,
    },

},{timestamps: true})

module.exports = mongoose.model("Profile", profileSchema);