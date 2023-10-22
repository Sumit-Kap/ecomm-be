const UserModel = require("../models/userModel");

module.exports = {
  postUserService: async (requestBody) => {
    try {
      const { name, lastName, emailId, phoneNumber, password } = requestBody;
      const user = new UserModel({
        first_name: name,
        last_name: lastName,
        email_id: emailId,
        phone_number: phoneNumber,
        password: password,
      });
      const response = await user.save();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  putUserService: async (requestBody, id) => {
    const { email, firstName, lastName } = requestBody;

    const response = await UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          email_id: email,
          first_name: firstName,
          last_name: lastName,
        },
      }
    );
    return response;
  },
  patchUserService: async (requestBody, id) => {
    const { email } = requestBody;
    const response = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          email_id: email,
        },
      }
    );
    return response;
  },
  getAllUsersService: async (query) => {
    const response = await UserModel.find({});
    console.log(response);
    return response;
  },
  deleteUserService: async (id) => {
    const response = await UserModel.deleteOne({ _id: id });
    return response;
  },
};

// authentication
// post management
// fetching all the post
// user follow relationships
// A-> B, C
// B and C
// B - Selling items -> purchase it
// payment gateway using stripe/razorpay
