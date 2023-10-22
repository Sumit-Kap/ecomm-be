const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersScema = new Schema({
  user_name: { type: String, required: true },
  confirm_password: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("Users", UsersScema);

module.exports = User;
