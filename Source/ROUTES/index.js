const homeRouter = require("./home");
const testRouter = require("./test");
const universityController = require("../APP/CONTROLLERS/UniversityController");
const ReportController = require("../APP/CONTROLLERS/ReportController");
const loginController = require("../APP/CONTROLLERS/LoginController");
const userController = require("../APP/CONTROLLERS/UserController");
const registerController = require("../APP/CONTROLLERS/RegisterController");
const account = require("../APP/MIDDLEWARE/Account");
const passport = require("passport");

function route(app) {
  app.get("/report", ReportController.report);
  app.get("/user/account", account.isLogin, userController.user);
  app.post("/login", loginController.login);
  app.get("/logout", account.isLogOut, loginController.logout);
  app.get("/createaccount", account.isLogOut, registerController.registerForm);
  app.post("/register", registerController.register);
  app.get("/university", account.isLogin, universityController.university);
  app.get("/university/:slug", account.isLogin, universityController.show);
  app.get("/test", account.isLogin, testRouter);
  app.get("/story", account.isLogin, homeRouter);
  app.get("/", account.isLogin, homeRouter);
  app.get(
    "/login/fb",
    passport.authenticate("facebook", { scope: ["email", "user_photos"] })
  );
  app.get(
    "/login/fb/cb",
    passport.authenticate("facebook", {
      failureRedirect: "/login",
      successRedirect: "/",
    })
  );
  app.get(
    "/login/gg",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/login/gg/cb",
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/",
    })
  );
}

module.exports = route;
