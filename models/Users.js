const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id:{
    type:Number,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true,
  },
  dailyInstallment:{
   require:true,
   type:Number
  },
  amount: {
    type:Number,
    required: true
  },
  
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
