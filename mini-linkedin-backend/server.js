
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();

const app = express();


connectDB();


app.use(cors()); 
app.use(express.json({ extended: false })); 
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
