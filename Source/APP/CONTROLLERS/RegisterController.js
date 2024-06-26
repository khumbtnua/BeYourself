const Account = require("../MODELS/Accountbs");
const bcrypt = require("bcrypt");

class RegisterController {
  async register(req, res) {
    const data = {
      name: req.body.username,
      password: req.body.password,
    };

    const existingUser = await Account.findOne({ name: data.name });
    if (existingUser) {
      res.send("User already exists. Please choose a different username");
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
      const userdata = await Account.insertMany(data);
    }

<<<<<<< HEAD
    res.redirect("/createaccount");
  }

  registerForm(req, res) {
    res.render("createaccount", {
      style: "login-register.css",
      function1: "login-register.js",
      layout: "extend",
=======
    res.render("register", {
      style: "login-register.css",
      layout: "extend",
    });
  }

  registerForm(req, res) {
    res.render("register", {
      style: "login-register.css",
      function1:"login-register.js",
      layout: "extend"
>>>>>>> 64ba317312acd6b769a0f8a8ebbaffd3790080d1
    });
  }
}

module.exports = new RegisterController();
