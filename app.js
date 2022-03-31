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
//API Endpoint for uploading file
//const upload = multer({ dest: "public/files" });
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });   

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

app.post("/api/uploadFile", upload.single("myFile"),async(req, res) => {
    // Stuff to be added later
    try {
        const newFile = await File.create({
          name: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "File created successfully!!",
        });
      } catch (error) {
        res.json({
          error,
        });
      }

  });

  app.get("/api/getFiles", async (req, res) => {
    try {
      const files = await File.find();
      res.status(200).json({
        status: "success",
        files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
  });
// Routes will be added here later on
app.use("/", (req, res) => {
    res.status(200).render("index");
  });


//Express server
module.exports = app;