const mongoose = require("mongoose");

const uri = "mongodb+srv://rajumainali1111:Amrita%401700155@cluster0.5etzgpe.mongodb.net/API?retryWrites=true&w=majority&appName=Cluster0";

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
