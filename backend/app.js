require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRoute = require("./routes/movie");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

app.use("/api/movie", movieRoute);

mongoose
  .connect(
    "mongodb+srv://abhay:Bangarang@cluster0.5ei76.mongodb.net/Possibillion?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening at PORT ${process.env.PORT}`);
    });
  });
