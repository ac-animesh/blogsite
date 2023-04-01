const express = require("express");
const router = express();
const { login, register } = require("../controllers/authController");

// desc     register route
// access   public
// route    POST /auth/register
router.post("/register", register);

// desc     login route
// access   public
// route    POST /auth/login
router.post("/login", login);

// desc     refresh token
// access   public
// route    POST /auth/refresh
// router.post("/refresh", login);

module.exports = router;
