const Blog = require('../models/Blog');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Comment = require('../models/Comment');

exports.write = async (req, res) => {
    try{
        const {title, content, author, status, slug} = req.body;
        const thumbnail = req.files.thumbnail;

        if(!title || !thumbnail || !content || !author || !status, !slug){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const existingBlog = await Blog.findOne({slug});
        if(existingBlog){
            return res.status(401).json({
                success: false,
                message: "Blog Already Exists with Same Title"
            })
        }

        // Uploading Image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        let dateString = new Date().toUTCString().slice(5, 16);

        const userDetails = await User.findOne({email: author});
        const response = await Blog.create({title, thumbnail: thumbnailImage.secure_url, content, author: userDetails._id, status, date: dateString, email: author, slug: slug});
        
        return res.status(200).json({
            success: true,
            message: "Blog Created Successfully !!",
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getRecommendedBlogs = async (req, res) => {
    try{
        const {email} = req.body;

        if(!email){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const response = await Blog.find({email: {$ne: email}, status: {$eq: "Published"}}).populate("author", {password: false, uid: false}).exec();
        return res.status(200).json({
            success: true,
            message: "Blog Fetched Successfully !!",
            blog: response
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getBlogs = async (req, res) => {
    try{
        const response = await Blog.find({status: {$eq: "Published"}}).populate("author", {password: false, uid: false}).exec();
        return res.status(200).json({
            success: true,
            message: "Blog Fetched Successfully !!",
            blog: response
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getBlog = async (req, res) => {
    try{
        const {slug} = req.body;

        const response = await Blog.find({ slug: slug, status: {$eq: "Published"}}).populate("author", {password: false, uid: false}).populate("comments").exec();
        return res.status(200).json({
            success: true,
            message: "Blog Fetched Successfully !!",
            blog: response
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.likeBlog = async (req, res) => {
    try{
        const {slug, username} = req.body;

        const existingBlog = await Blog.findOne({slug});
        if(!existingBlog){
            return res.status(401).json({
                success: false,
                message: "Blog Does not Exists !"
            })
        }

        if(existingBlog.likes.includes(username)){
            return res.status(401).json({
                success: false,
                message: "Blog is Already Liked by the user"
            })
        }

        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Does not Exists !"
            })
        }

        await Blog.findByIdAndUpdate({_id: existingBlog.id}, {
                $push: {
                    likes: existingUser.username
                }
            },
            {new: true},
        );

        return res.status(200).json({
            success: true,
            message: "Blog Liked Successfully !!"
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.dislikeBlog = async (req, res) => {
    try{
        const {slug, username} = req.body;

        const existingBlog = await Blog.findOne({slug});
        if(!existingBlog){
            return res.status(401).json({
                success: false,
                message: "Blog Does not Exists !"
            })
        }

        if(!existingBlog.likes.includes(username)){
            return res.status(401).json({
                success: false,
                message: "Blog is Not Liked by the user"
            })
        }

        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Does not Exists !"
            })
        }

        await Blog.findByIdAndUpdate({_id: existingBlog.id}, {
                $pull: {
                    likes: existingUser.username
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Blog Disliked Successfully !!"
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.commentBlog = async (req, res) => {
    try{
        const {slug, username, comment} = req.body;

        const existingBlog = await Blog.findOne({slug});
        if(!existingBlog){
            return res.status(401).json({
                success: false,
                message: "Blog Does not Exists !"
            })
        }

        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Does not Exists !"
            })
        }

        const commentDb = await Comment.create({slug, username, name: existingUser.name, image: existingUser.image, comment})

        await Blog.findByIdAndUpdate({_id: existingBlog.id}, {
                $push: {
                    comments: commentDb._id
                }
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Comment Posted Successfully !!"
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}