// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB cluster using the URI from the .env file
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // If there's an error connecting, exit the entire process with a failure code
        process.exit(1);
    }
};

// This is the most important line. It makes the connectDB function available to other files.
module.exports = connectDB;
