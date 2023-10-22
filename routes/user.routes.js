const userController = require("../app/controller/userController");
module.exports = (app) => {
  app.get("/users", userController.getUsers); // All the users there in the database
  app.post("/createUser", userController.postUsers); // Create a new user
  app.put("/updateUser/:id", userController.putUsers);
  app.patch("/updateUserByKey/:id", userController.patchUsers);
  app.delete("/user/:id", userController.deleteUsers);
};
