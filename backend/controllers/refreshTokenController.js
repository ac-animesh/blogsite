const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// desc     refresh token
// access   public
// route    GET /api/auth/refresh
const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Not found" });

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: "Forbiden" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.name !== decoded.username) {
          return res.status(403).json({ message: "Forbbiden" });
        }

        let accessToken = jwt.sign(
          { id: user._id, username: user.name },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({ accessToken: accessToken });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  handleRefreshToken,
};
