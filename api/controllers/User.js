const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const otpGenerator = require("otp-generator");
const validator = require('email-validator');
const { generateFromEmail } = require("unique-username-generator");

// SendOTP
exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;

        const isValid = validator.validate(email);
        if(!isValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Email ID"
            })
        }
        
        // Check if user is already present
        const checkUserPresent = await User.findOne({email});

        // If User found with provided email
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User is Already Registered"
            })
        }

        // Generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        const otpBody = await OTP.create({email, otp});

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// SignUp with Google
exports.register = async (req, res) => {
    try{
        const {name, email, password, confirmPassword, image, uid} = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password must be Same"
            })
        }

        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists!"
            })
        }

        let username = generateFromEmail(email,0);
        let existingUserName = await User.findOne({username});
        while(existingUserName){
            username = generateFromEmail(email,4);
            existingUserName = await User.findOne({username});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if(!uid){
            const response = await User.create({name, email, password: hashedPassword, image, username});
        }
        else{
            const response = await User.create({name, email, password: hashedPassword, image, uid, username});
        }
        
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// SignUp with Email
exports.registerEmail = async (req, res) => {
    try{
        const {name, email, password, confirmPassword, image, otp} = req.body;

        if(!name || !email || !password || !confirmPassword, !image, !otp){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        if(password!==confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password must be Same"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User Already Exists!"
            })
        }

        // Find the Most recent OTP for the email
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOTP.length == 0){
            return res.status(401).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        let username = generateFromEmail(email,0);
        let existingUserName = await User.findOne({username});
        while(existingUserName){
            username = generateFromEmail(email,4);
            existingUserName = await User.findOne({username});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({name, email, password: hashedPassword, image, username});

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Login with Google
exports.signin = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email}).populate("following", {username: true});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {...existingUser._doc, password: undefined, uid: undefined}
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email}).populate("following", {username: true});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist, Please Register"
            })
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if(!hashedPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid Email Id or Password"
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                user: {...existingUser._doc, password: undefined, uid: undefined}
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// SendOTP
exports.sendResetOTP = async (req, res) => {
    try{
        const {email} = req.body;

        const isValid = validator.validate(email);
        if(!isValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Email ID"
            })
        }
        
        // Check if user is already present
        const checkUserPresent = await User.findOne({email});

        // If User found with provided email
        if(!checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User is Doesn't Exists"
            })
        }

        // Generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        const otpBody = await OTP.create({email, otp});

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.resetPasswordOTP = async (req, res) => {
    try{
        const {email, otp} = req.body;

        if(!email || !otp){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exists!"
            })
        }

        // Find the Most recent OTP for the email
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOTP.length == 0){
            return res.status(401).json({
                success: false,
                message: "OTP Not Found"
            })
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        return res.status(200).json({
            success: true,
            message: "OTP Validated Successfully !!",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try{
        const {email, password, confirmPassword} = req.body;

        if(!email || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.findOneAndUpdate({email}, {password: hashedPassword});

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.followUser = async (req, res) => {
    try{
        const {followerUsername, followingUsername} = req.body;

        if(!followerUsername || !followingUsername ){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const followerUser = await User.findOne({username: followerUsername}).populate("followers",{username: true});
        if(!followerUser ){
            return res.status(401).json({
                success: false,
                message: "User Not Exists"
            })
        }


        const followingUser = await User.findOne({username: followingUsername}).populate("following",{username: true});
        if(!followingUser ){
            return res.status(401).json({
                success: false,
                message: "User Not Exists"
            })
        }

        const checkUsername1 = obj => obj.username === followingUsername;
        const checkUsername2 = obj => obj.username === followerUsername;

        if(followerUser.followers.some(checkUsername1)){
            return res.status(401).json({
                success: false,
                message: "Follower Already Exists"
            })
        }

        if(followingUser.following.some(checkUsername2)){
            return res.status(401).json({
                success: false,
                message: "Following Already Exists"
            })
        }

        await User.findByIdAndUpdate({_id: followerUser._id}, {
            $push: {
                followers: followingUser._id
            }
        })

        await User.findByIdAndUpdate({_id: followingUser._id}, {
            $push: {
                following: followerUser._id
            }
        })

        return res.status(200).json({
            success: true,
            message: "Followed Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


exports.unfollowUser = async (req, res) => {
    try{
        const {followerUsername, followingUsername} = req.body;

        if(!followerUsername || !followingUsername ){
            return res.status(401).json({
                success: false,
                message: "Fill All the Details"
            })
        }

        const followerUser = await User.findOne({username: followerUsername}).populate("followers",{username: true});
        if(!followerUser ){
            return res.status(401).json({
                success: false,
                message: "User Not Exists"
            })
        }


        const followingUser = await User.findOne({username: followingUsername}).populate("following",{username: true});
        if(!followingUser ){
            return res.status(401).json({
                success: false,
                message: "User Not Exists"
            })
        }

        const checkUsername1 = obj => obj.username === followingUsername;
        const checkUsername2 = obj => obj.username === followerUsername;

        if(!followerUser.followers.some(checkUsername1)){
            return res.status(401).json({
                success: false,
                message: "Follower Does not Exists"
            })
        }

        if(!followingUser.following.some(checkUsername2)){
            return res.status(401).json({
                success: false,
                message: "Following Does Not Exists"
            })
        }

        await User.findByIdAndUpdate({_id: followerUser._id}, {
            $pull: {
                followers: followingUser._id
            }
        })

        await User.findByIdAndUpdate({_id: followingUser._id}, {
            $pull: {
                following: followerUser._id
            }
        })

        return res.status(200).json({
            success: true,
            message: "Unfollowed Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}



exports.getUser = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }

        const existingUser = await User.findOne({email}).populate("following", {username: true});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User Doesn't Exist, Please Register"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {...existingUser._doc, password: undefined, uid: undefined}
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}