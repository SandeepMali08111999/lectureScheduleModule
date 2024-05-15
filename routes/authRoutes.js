const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getRegister,
  getLogin,
  logOut,
} = require("../controllers/authController");
const {
  userLoginValidate,
  userRegisterValidate,
} = require("../utils/userValidation");

router.route("/register").get(getRegister).post(userRegisterValidate, register);

router.route("/login").get(getLogin).post(userLoginValidate, login);

router.route("/logout").post(logOut);
module.exports = router;
