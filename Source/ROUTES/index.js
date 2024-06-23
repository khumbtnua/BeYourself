const homeRouter = require("./home");
const testRouter = require("./test");
const universityRouter = require("./university");
const loginController = require("../APP/CONTROLLERS/LoginController");
const registerController = require("../APP/CONTROLLERS/RegisterController");
const account = require("../APP/MIDDLEWARE/Account");

function route(app) {
  app.get("/login", account.isLogOut, loginController.loginForm);
  app.post("/login", loginController.login);
  app.get("/logout", account.isLogOut, loginController.logout);
  app.get("/register", account.isLogOut, registerController.registerForm);
  app.post("/register", registerController.register);
  app.get("/university", account.isLogin, universityRouter);
  app.get("/test", account.isLogin, testRouter);
  app.get("/story", account.isLogin, homeRouter);
  app.get("/", account.isLogin, homeRouter);
}

module.exports = route;
