const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  User:String
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
