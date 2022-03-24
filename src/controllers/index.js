const authController = require("./auth");
const employeeControllers = require("./employees");
const postController = require("./posts");

module.exports = {
  employeeControllers,
  authController,
  postController
}