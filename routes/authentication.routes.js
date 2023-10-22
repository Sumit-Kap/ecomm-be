const authenticationController = require("../app/controller/authenticationController");
const middleware = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.post("/signup/user", authenticationController.signUp);
  app.post("/login/user", authenticationController.login);
  app.get("/user/auth/check", authenticationController.checkCookie);
  app.get(
    "/users/:id",
    middleware.authenticationMiddleware,
    authenticationController.getUser
  );
};
