const express = require("express");
const router = express();
const auth = require("../middleware/authMiddleware");
const { deleteUser, updateUser } = require("../controllers/userController");

// desc     delete user
// access   public
// route    POST /auth/register
router.delete("/:id", auth, deleteUser);

// desc     update User
// access   public
// route    POST /auth/login
router.put("/:id", auth, updateUser);

module.exports = router;
