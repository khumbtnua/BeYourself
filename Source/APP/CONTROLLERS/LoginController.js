const Account = require("../MODELS/Accountbs");
const bcrypt = require("bcrypt");
const { mutipleMongooseToObject } = require("../../UTIL/mongoose");

class LoginController {
  async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const check = await Account.findOne({ name: username });
      if (!check) {
        res.send("User cannot found!");
      } else {
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (isPasswordMatch) {
          req.session.username = check.name;
          res.locals.username = req.session.username;
          const redirectUrl = req.session.currentPath || "/";
          res.redirect(redirectUrl);
        } else {
          res.send("Wrong password");
        }
      }
    } catch (error) {
      console.log(error.message);
      res.send("Wrong Details!");
    }
  }

  async logout(req, res, next) {
    try {
      const redirectUrl = req.session.currentPath || "/";
      req.session.destroy();
      res.redirect(redirectUrl);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new LoginController();
