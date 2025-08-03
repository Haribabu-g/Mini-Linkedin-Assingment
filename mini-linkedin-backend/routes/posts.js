// routes/posts.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // Newest first
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/user/:userId
// @desc    Get all posts by a specific user
// @access  Public
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).sort({ date: -1 });
        
        if (!posts) {
            return res.status(404).json({ msg: 'No posts found for this user' });
        }

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
});

// This line is essential for the file to work correctly.
module.exports = router;
