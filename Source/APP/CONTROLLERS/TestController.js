class TestController {
  test(req, res) {
    res.render("test", {
      style: "test-light.css",
      function1: "mbti.js",
      function2: "holland.js",
      username: req.user.name,
      userimg: req.user.img,
    });
  }
}

module.exports = new TestController();
