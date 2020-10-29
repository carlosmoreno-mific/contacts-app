const usersController = {};

const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// @desc    Get login page
// @route   GET /users/login
// @access  Public
usersController.login = (req, res) => {
  res.render("users/login");
};

// @desc    Send login data
// @route   POST /users/login
// @access  Public
usersController.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/contacts",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

// @desc    Get register page
// @route   GET /users/register
// @access  Public
usersController.register = (req, res) => {
  const name = "",
    email = "",
    password = "",
    confirmPassword = "";

  res.render("users/register", {
    name,
    email,
    password,
    confirmPassword,
  });
};

// @desc    Send register data
// @route   POST /users/register
// @access  Public
usersController.postRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let errors = [];

  if (password !== confirmPassword) {
    errors.push({ message: "Password don't match" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    const user = await User.findOne({ email: email });

    if (user) {
      errors.push({ message: "Email is already registered." });
      res.render("users/register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      const newPassword = await newUser.encryptPassword(newUser.password);
      newUser.password = newPassword;
      await newUser.save();

      req.flash("success_message", "You are now registered and can log in.");
      res.redirect("/users/login");
    }
  }
};

// @desc    Logout a user
// @route   GET /users/logout
// @access  Private
usersController.logout = (req, res, next) => {
  req.logout();
  req.flash("success_message", "You are logged out");
  res.redirect("/users/login");
};

module.exports = usersController;
