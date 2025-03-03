require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDb = async () => {
  try {   
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB is connected');
  } catch (err) {
    console.error('Database connection error:', err.message || err);
  }
};

module.exports = connectDb;
