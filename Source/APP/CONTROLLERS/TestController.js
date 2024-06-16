class TestController {
  test(req, res) {
    res.render("test", {
      style: "test-light.css",
      function1: "mbti.js",
      function2: "holland.js",
    });
  }
}

module.exports = new TestController();
