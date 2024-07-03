class TestController {
  test(req, res) {
    res.render("test", {
      style: "test-light.css",
      function1: "mbti.js",
      function2: "holland.js",
<<<<<<< HEAD
=======
      navbar: "navbar.js",
>>>>>>> 8e7d628 (Nothing)
      username: req.user.name,
      userimg: req.user.img,
    });
  }
}

module.exports = new TestController();
