const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
    
},{timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);