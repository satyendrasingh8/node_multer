const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const DB = "mongodb+srv://satyendra:9fgt7389AB@cluster0.gn6uo.mongodb.net/multer?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  }).catch((e)=>{
      console.log("connection fail")
  });

const port = 3000;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});