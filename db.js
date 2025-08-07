const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://no3sqnbaf:FWWkPxii3qJ6xcSs@cluster0.tlttord.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    // Or use your Atlas URI
    // await mongoose.connect('mongodb+srv://dbuser:cLa9fUpMDXDgziS5@cluster0.s4o1w.mongodb.net/testdb');
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
