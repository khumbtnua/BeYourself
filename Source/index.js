const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const path = require("path");
const port = 5500;
const route = require("./ROUTES");
const session = require("express-session");
const db = require("./CONFIG/DB");

db.connect();

app.use(
  session({
    secret: "accountsessionsecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  const acceptHeader = req.headers.accept || "";
  if (
    acceptHeader.includes("text/html") &&
    req.path !== "/login" &&
    req.path !== "/logout"
  ) {
    req.session.currentPath = req.path;
  }
  next();
});

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resource/VIEWS"));
app.use("/img", express.static("img"));
app.use(express.static(path.join(__dirname, "PUBLIC/CSS/")));
app.use(express.static(path.join(__dirname, "PUBLIC/JS/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
