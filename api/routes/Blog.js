const express = require('express');
const router = express.Router();

const { write, getRecommendedBlogs, getBlogs, getBlog, likeBlog, dislikeBlog, commentBlog } = require('../controllers/Blog');

router.post('/write', write);
router.post('/get-recommended-blogs', getRecommendedBlogs);
router.get('/get-blogs', getBlogs);
router.post('/get-blog', getBlog);
router.post('/like-blog', likeBlog);
router.post('/dislike-blog', dislikeBlog);
router.post('/comment-blog', commentBlog);

module.exports = router;