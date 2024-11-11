const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    // in try catch as if authorization is undefined will return error
    const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) {
      throw new Error("Authentication failed!", 401);
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId }; // add data to the req once validated
    next(); //able to reach other routes
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
