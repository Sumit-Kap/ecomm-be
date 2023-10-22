const User = require("../models/userModel");
const jsonWebTokens = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  registerUser: async (requestBody) => {
    try {
      const { userName, password, confirmPassword } = requestBody;
      const salt = bcrypt.genSaltSync(+process.env.PASSWORD_HASH_ROUNDS);
      const maskedPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        user_name: userName,
        password: maskedPassword,
        confirm_password: maskedPassword,
      });

      const response = await user.save();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  loginUser: async (requestBody) => {
    try {
      const { userName, password } = requestBody;
      const userData = await User.findOne({ user_name: userName });
      console.log(userData);
      const passwordVerify = bcrypt.compareSync(password, userData.password);
      if (passwordVerify) {
        const token = await jsonWebTokens.sign(userData.id, process.env.SECRET);
        userData.token = token;
        return userData;
      }
    } catch (err) {
      console.log(err);
      res.statusCode(401).json({ message: "user not authenticated" });
    }
  },
  verifyUser: async (auth) => {
    try {
      const verify = await jsonWebTokens.verify(auth, process.env.SECRET);
      const userData = await User.findOne({ _id: verify });
      return userData;
    } catch (err) {
      console.log(err);
      res.statusCode(401).json({ message: "user not authenticated" });
    }
  },
  getUser: async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (err) {
      console.log(err);
      res.statusCode(401).json({ message: "user not authenticated" });
    }
  },
};
