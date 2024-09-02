const University = require("../MODELS/University");
const Quote = require("../MODELS/Quote");
const { mongooseToObject } = require("../../UTIL/mongoose");
const { mutipleMongooseToObject } = require("../../UTIL/mongoose");

class UniversityController {
  async university(req, res) {
    try {
      const successLogin = req.flash("successlogin");
      if (Object.keys(successLogin).length === 0) {
      } else {
        req.toastr.success(
          "Chúc một ngày tốt lành!",
          Object.values(successLogin)[0],
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
      var dataQuote = await Quote.find({});
      var data = await University.find({});
      res.render("university", {
        style: "university-light.css",
        function1: "university.js",
        username: req.user.name,
        userimg: req.user.img,
        navbar: "navbar.js",
        quotes: JSON.stringify(mutipleMongooseToObject(dataQuote)),
        universities: JSON.stringify(mutipleMongooseToObject(data)),
        toastr_render: req.toastr.render(),
      });
    } catch (err) {
      res.status(400).json({ error: "FAILED!!!" });
    }
  }

  show(req, res, next) {
    University.findOne({ slug: req.params.slug })
      .then(function (college) {
        res.render("college", {
          layout: "extend",
          style: "universitydetail-light.css",
          function1: "iframe.js",
          userId: req.session.userId || req.user._id,
          college: mongooseToObject(college),
        });
      })
      .catch(next);
  }
}

module.exports = new UniversityController();
