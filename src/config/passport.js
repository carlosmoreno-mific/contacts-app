const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");
const passport = require("passport");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          // user not exists
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          const isMatch = await user.matchPassword(password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
