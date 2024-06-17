const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");
const port = 5500;
const route = require("./ROUTES");
const db = require("./CONFIG/DB");

db.connect();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resource/VIEWS"));
app.use("/img", express.static("img"));
app.use(express.static(path.join(__dirname, "PUBLIC/CSS/")));
app.use(express.static(path.join(__dirname, "PUBLIC/JS/")));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
