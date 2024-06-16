const homeRouter = require("./home");
const testRouter = require("./test");
const universityRouter = require("./university");

function route(app) {
  /*Use homeRouter for path with / */
  app.use("/university", universityRouter);
  app.use("/test", testRouter);
  app.use("/story", homeRouter);
  app.use("/", homeRouter);
}

module.exports = route;
