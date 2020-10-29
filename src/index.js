const { join } = require("path");
const dotenv = require("dotenv");
const express = require("express");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const connectMongo = require("connect-mongo");
const session = require("express-session");
const { seedContacts } = require("./config/seed");
const mongoose = require("mongoose");

dotenv.config();
const MongoStore = connectMongo(session);

const app = express();

// Passport config
require("./config/passport")(passport);

// DB Config
require("./config/db");
seedContacts();

// EJS
app.set("views", join(__dirname, "views"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Middlewares
app.use(
  session({
    secret: "super-secret-key",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");

  res.locals.user = req.user || null;
  next();
});

// Routes
const indexRoutes = require("./api/routes/index.routes");
const usersRoutes = require("./api/routes/users.routes");
const contactsRoutes = require("./api/routes/contacts.routes");

app.use("/", indexRoutes);
app.use("/contacts", contactsRoutes);
app.use("/users", usersRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
