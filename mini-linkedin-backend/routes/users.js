// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET api/users/:userId
// @desc    Get user profile by user ID
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        // Find the user by their ID provided in the URL parameters.
        // We use .select('-password') to exclude the user's password hash from the response for security.
        const profile = await User.findById(req.params.userId).select('-password');

        // If no user is found with that ID, return a 404 (Not Found) error.
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        // If the profile is found, return it as a JSON response.
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        // Mongoose throws a 'CastError' with kind 'ObjectId' if the provided ID is not a valid format.
        // We can catch this to also return a 404 error, as an invalid ID means the profile can't be found.
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        // For any other type of error, we return a 500 (Internal Server Error) status.
        res.status(500).send('Server error');
    }
});

module.exports = router;
