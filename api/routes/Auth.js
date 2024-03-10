const express = require('express');
const router = express.Router();

const {register, login, sendOTP, registerEmail, signin, resetPasswordOTP, sendResetOTP, resetPassword, followUser, getUser, unfollowUser} = require('../controllers/User');

router.post('/register', register);
router.post('/login', login);
router.post('/signin', signin);
router.post('/otp', sendOTP);
router.post('/verify', registerEmail);
router.post('/reset-password/otp', sendResetOTP);
router.post('/reset-password/verify', resetPasswordOTP);
router.post('/reset-password', resetPassword);

router.post('/follow', followUser);
router.post('/unfollow', unfollowUser);
router.post('/get-user', getUser);

module.exports = router;