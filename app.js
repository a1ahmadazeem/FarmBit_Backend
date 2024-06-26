const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = 3000;

const authRoutes = require("./routes/users");

mongoose
  .connect(
    "mongodb+srv://ahmadazeem1586:nOWaH5Ljoj7hA7wu@farmbit.vckwmma.mongodb.net/FarmBit?retryWrites=true&w=majority",
    {
      // dbName: "farmbit",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use("/users", authRoutes);

app.use("/", (req, res, next) => {
  res.status("404").json({ message: "Not found_" });
});

app.listen(PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});
///
