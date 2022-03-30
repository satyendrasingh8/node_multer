const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const File = require("./model/fileSchema");
const app = express();

// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER

// Routes will be added here later on
app.use("/", (req, res) => {
    res.status(200).render("index");
  });


//Express server
module.exports = app;