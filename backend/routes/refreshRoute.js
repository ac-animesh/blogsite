const express = require("express");
const router = express();
const { handleRefreshToken } = require("../controllers/refreshTokenController");

// desc     refresh token
// access   public
// route    GET /api/auth/refresh
router.get("/", handleRefreshToken);

module.exports = router;
