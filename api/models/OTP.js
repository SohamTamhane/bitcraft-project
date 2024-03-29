const mongoose = require("mongoose");
const mailSender = require("../config/mainSender");
const otpTemplate = require("../mail/otpMail");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
});

// To Send Email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Mail from BitCraft", otpTemplate(otp));
    }
    catch(error){
        console.log("Error Occured while sending Mails: ", error);
        throw error;
    }
}

// Pre Middleware - To Send Email Before Saving OTP in Database
OTPSchema.pre("save", async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);