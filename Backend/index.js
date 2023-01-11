const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Router = require("./routes");
//envioronment variables
dotenv.config();
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connection successful");
  }).catch(err=>{
    console.log(err)
  });
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Router);
// app.use("/product", product);
// app.use("/category", category);
// app.use("/user", user);
// app.use("/admin", admin);
// Serve any static files
// app.use(express.static(path.join(__dirname, "zomato/build")));
// Handle React routing, return all requests to React app
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client1/build", "index.html"));
// });
  // }
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("express server is runnning on port " + port);
});