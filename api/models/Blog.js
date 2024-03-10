const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [
        {
            type: String,
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    status: {
        type: String,
        required: true,
        enum: ["Draft", "Published"]
    },
    date: {
        type: String,
        required: true,
    },
    summary: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
    
},{timestamps: true});

module.exports = mongoose.model("Blog", BlogSchema);