const orderController = require("../app/controller/userController");
module.exports = (app) => {
  app.get("/create-order", orderController.getUsers); // All the users there in the database
  app.post("/verify/payment-status", orderController.verifyPaymentSuccess);
};
