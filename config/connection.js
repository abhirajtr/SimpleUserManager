const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => { 
    const URI = process.env.MONGOOSE_URI;
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (err) {
        console.error("Database connection error!", err);
    }
}

module.exports = connectDB();