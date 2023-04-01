const User = require("../models/userSchema");
// const RefreshToken = require("../models/refreshTokenSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// desc     register route
// access   public
// route    POST /api/auth/register
const register = async (req, res) => {
  const { name, email, isAdmin, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User is already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      isAdmin,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ message: "User is Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// desc     login route
// access   public
// route    POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required." });

    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found." });

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Access Token
      const accessToken = jwt.sign(
        { id: user._id, username: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7m",
        }
      );
      // Refresh Token
      const refreshToken = jwt.sign(
        { id: user._id, username: user.name },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      user.refreshToken = refreshToken;

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        // secure: true,
        // sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      await user.save();
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic: user.profilePic,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(500).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  login,
  register,
};
