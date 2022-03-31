var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
var pushtriggerRouter = require("./routes/pushtrigger");
var add_productRouter = require("./routes/add_product");
var get_productRouter = require("./routes/get_product");
var get_student_detailsRouter = require("./routes/get_student_details");
var get_menu_detailsRouter = require("./routes/get_menu_details");
var pagination_apiRouter = require("./routes/pagination_api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);
app.use("/pushtrigger", pushtriggerRouter);
app.use("/add_product", add_productRouter);
app.use("/get_product", get_productRouter);
app.use("/get_student_details", get_student_detailsRouter);
app.use("/get_menu_details", get_menu_detailsRouter);
app.use("/pagination_api",pagination_apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
