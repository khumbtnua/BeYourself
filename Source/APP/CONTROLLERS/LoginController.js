const Account = require("../MODELS/Accountbs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

// Admin to User
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "BeYourselfEducationPlatform@gmail.com",
    pass: "qvne jevn nzme zcqu",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      extName: ".hbs",
      defaultLayout: false,
    }),
    viewPath: "Source/Resource/VIEWS",
    extName: ".hbs",
  })
);

class LoginController {
  async login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const check = await Account.findOne({ name: username });
      if (!check) {
        req.flash("wrongname", "Hãy kiểm tra lại tên đăng nhập của bạn");
        res.redirect("/createaccount");
      } else {
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (isPasswordMatch) {
          req.session.username = check.name;
          res.locals.username = req.session.username;
          const redirectUrl = req.session.currentPath || "/";
          req.flash("successlogin", "Đã đăng nhập thành công!");
          res.redirect(redirectUrl);
        } else {
          req.flash("wrongpass", "Hãy kiểm tra lại mật khẩu của bạn");
          res.redirect("/createaccount");
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

  async forgotpassword(req, res, next) {
    try {
      res.render("forgetpassword", {
        layout: "extend",
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async resetpassword(req, res, next) {
    try {
      const email = req.body.email;
      req.session.email = email;
      const checkemail = await Account.findOne({ email });
      if (checkemail) {
        async function main() {
          const info = await transporter.sendMail({
            from: '"BeYourself Education Platform"',
            to: email,
            subject: "Reset Password",
            template: "sendmail",
          });
          console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);
        req.flash("sendmail", "Email đã được gửi thành công");
        res.redirect("/createaccount");
      } else {
        req.flash("wrongmail", "Hãy xem lại tài khoản email của bạn");
        res.redirect("/createaccount");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async changepassword(req, res, next) {
    try {
      var oldpass = req.body.oldpassword;
      var newpass = req.body.newpassword;
      var username = req.session.username;

      var checkpass = await Account.findOne({ name: username });
      var isPasswordMatchOld = await bcrypt.compare(
        oldpass,
        checkpass.password
      );
      if (isPasswordMatchOld) {
        var isPasswordMatchNew = await bcrypt.compare(
          newpass,
          checkpass.password
        );
        if (isPasswordMatchNew) {
          req.flash(
            "errorchangepass",
            "Hãy đổi mật khẩu mới không trùng mật khẩu cũ"
          );
          res.redirect("/");
        } else {
          var saltRounds = 10;
          var hashedPassword = await bcrypt.hash(newpass, saltRounds);
          newpass = hashedPassword;
          var filter = { name: username };
          var updateDoc = {
            $set: {
              password: newpass,
            },
          };
          await Account.updateOne(filter, updateDoc);
          req.flash("successchangepass", "Đã đổi mật khẩu thành công!");
          res.redirect("/");
        }
      } else {
        req.flash("errorsameoldpass", "Hãy nhập đúng mật khẩu cũ");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async postfeedback(req, res, next) {
    try {
      const emailUser = req.body.email;
      const checkemail = await Account.findOne({ email: emailUser });
      if (checkemail) {
        async function main() {
          const info = await transporter.sendMail({
            from: '"BeYourself Education Platform"',
            to: emailUser,
            subject: "Send Feedback",
            template: "sendfeedback",
          });
          console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);
      }
      req.flash("successsendfeed", "Successfully sent feedback");
      res.redirect("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  async createnewpassword(req, res, next) {
    try {
      const errornewpass = req.flash("errorsamenewpass");
      const successnewpass = req.flash("successnewpass");
      if (Object.keys(successnewpass).length === 0) {
      } else {
        req.toastr.success(
          "Chúc một ngày tốt lành!",
          Object.values(successnewpass)[0],
          {
            closeButton: true,
            debug: true,
            newestOnTop: false,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: true,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
          }
        );
      }
      if (Object.keys(errornewpass).length === 0) {
      } else {
        req.toastr.error("Hãy thử lại nhé!", Object.values(errornewpass)[0], {
          closeButton: true,
          debug: true,
          newestOnTop: false,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: true,
          onclick: null,
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "5000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        });
      }
      res.render("createnewpassword", {
        layout: "extend",
        toastr_render: req.toastr.render(),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async savenewpassword(req, res, next) {
    try {
      var newpass = req.body.newpass;
      const checkuser = await Account.findOne({ email: req.session.email });
      var isPasswordMatch = await bcrypt.compare(newpass, checkuser.password);
      if (isPasswordMatch) {
        req.flash(
          "errorsamenewpass",
          "Hãy chọn mật khẩu mới không trùng với mật khẩu cũ"
        );
        res.redirect("/createnewpass");
      } else {
        if (checkuser) {
          var filter = { email: req.session.email };
          var saltRounds = 10;
          var hashedPassword = await bcrypt.hash(newpass, saltRounds);
          newpass = hashedPassword;
          var updateDoc = {
            $set: {
              password: newpass,
            },
          };
          await Account.updateOne(filter, updateDoc);
          req.flash("successnewpass", "Đổi mật khẩu thành công");
          res.redirect("/createaccount");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new LoginController();
