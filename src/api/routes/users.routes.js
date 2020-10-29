const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth");
const usersController = require("../controllers/users.controller");

router.get(
  "/login",
  authMiddleware.forwardAuthenticated,
  usersController.login
);

router.post(
  "/login",
  authMiddleware.forwardAuthenticated,
  usersController.postLogin
);

router.get(
  "/register",
  authMiddleware.forwardAuthenticated,
  usersController.register
);

router.post(
  "/register",
  authMiddleware.forwardAuthenticated,
  usersController.postRegister
);

router.get(
  "/logout",
  authMiddleware.ensureAuthenticated,
  usersController.logout
);

module.exports = router;
