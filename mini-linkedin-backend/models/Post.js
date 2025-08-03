// mini-linkedin-backend/models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a post
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Creates a reference to the User model
    },
    text: {
        type: String,
        required: true,
    },
    // We store the user's name directly on the post to avoid extra database lookups
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// This is the most important line: It creates the model and exports it.
module.exports = mongoose.model('Post', PostSchema);
