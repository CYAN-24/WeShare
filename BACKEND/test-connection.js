require("dotenv").config();
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.m7avf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB connected successfully");
    mongoose.connection.close(); // Close the connection after success
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
