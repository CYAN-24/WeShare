const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersControllers = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(), // tEst@test.com -> test@test.com
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

// validation not required as usersControllers.login will validate it
router.post("/login", usersControllers.login);

module.exports = router;
