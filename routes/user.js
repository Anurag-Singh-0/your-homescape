const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const flash = require("connect-flash");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const userControllers = require("../controllers/users.js");

// For rendering the signup page
router.get("/signup", (req, res) => {
  res.render("login-signup/signup.ejs");
});

// Actual implementation of signup page - main logic
router.post("/signup", wrapAsync(userControllers.signUp));

// For rendering the login page
router.get("/login", (req, res) => {
  res.render("login-signup/login");
});

// Actual implementation of login page - main logic
/* Here we use a middleware passport.authenticate() that is use for authenticate the user information*/
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userControllers.login
);

// For logout
router.get("/logout", userControllers.logout);

module.exports = router;
