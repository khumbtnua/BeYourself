const Account = require("../MODELS/Account");
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

    res.render("register", {
      style: "register-light.css",
      layout: "extend",
    });
  }

  registerForm(req, res) {
    res.render("register", {
      style: "register-light.css",
      layout: "extend",
    });
  }
}

module.exports = new RegisterController();
