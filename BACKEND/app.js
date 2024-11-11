require("dotenv").config();

//file system module
const fs = require("fs");
const path = require("path");

//Middleware
const express = require("express");
const bodyParser = require("body-parser");

//DB
const mongoose = require("mongoose");

//routes configured at places-routes is added as middleware
const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");

const usersRoutes = require("./routes/users-routes");

const app = express();

// this will parse any incoming request body and extract any json data which is in there
app.use(bodyParser.json());

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// with 4 params, expressjs will treat this as a special middleware function
// (only executed on request that have error attched to it)
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.error("Error deleting image:", err);
      return next(new HttpError("Could not delete image.", 500));
    });
  }
  if (res.headerSent) {
    //Check if a res has already been sent
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = process.env.PORT || 4000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.m7avf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log("MongoDB connection error:", err));
