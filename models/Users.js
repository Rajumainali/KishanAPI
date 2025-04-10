const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  DailyInstallment:{
   require:true,
   type:Number
  },
  Amount: {
    type:Number,
    required: true
  },
  
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
