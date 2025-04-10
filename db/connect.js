const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/API";  // Replace 'API' with your database name

const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
