var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");

var indexRouter = require("./routes/index");
var notificationsRouter = require("./routes/webHooks");

var app = express();

dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/", notificationsRouter);

app.listen(8080, () => {
  console.log("listening on port 8080");
});

module.exports = app;
