const authenticationService = require("../../service/authenticationService");
module.exports = {
  signUp: async (req, res, next) => {
    // write the logic
    try {
      const { userName, password, confirmPassword } = req.body;
      const response = await authenticationService.registerUser({
        userName,
        password,
        confirmPassword,
      });
      res.json(response);
    } catch (err) {
      console.log(err);
    }
  },
  login: async (req, res, next) => {
    const { userName, password } = req.body;
    const response = await authenticationService.loginUser({
      userName,
      password,
    });
    // res.cookie("authToken", response.token, { expire: 360000 + Date.now() });
    res.status(200).json({ authToken: response.token, id: response._id });
  },
  checkCookie: async (req, res, next) => {
    const { authorization } = req.headers;
    const response = await authenticationService.verifyUser(authorization);
    res.status(200).json({ id: response._id });
  },
  getUser: async (req, res, next) => {
    const { id } = req.params;
    const response = await authenticationService.getUser(id);
    res.status(200).json(response);
  },
};

// Client -> Server
// localhost -> Netlix API/ Fb/ Uber
//
