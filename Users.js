const mongoose = require("mongoose");

// Schema for individual record inside 'data'
const recordSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  dailyInstallment: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  details:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
 who:{
  type: String,
  required: true,
  },
  startingDate:{
   type:Date,
   required:true,
   default: Date.now,
   
  },
  endingDate:{
    type:Date,
    required:true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
},{
  toJSON: {
    transform: (doc, ret) => {
      // Convert date fields using toDateString()
      if (ret.startingDate) {
        ret.startingDate = new Date(ret.startingDate).toDateString(); // e.g., "Sun Apr 13 2025"
      }
      if (ret.endingDate) {
        ret.endingDate = new Date(ret.endingDate).toDateString();
      }
      return ret;
    }
  }
});

// Schema for each user and their embedded data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  data: [recordSchema], // Embedded array of records
});

const User = mongoose.model("User", userSchema);

module.exports = User;
