const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Not Authorised" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not Valid" });
    req.user = await User.findById(decoded.id).select("-password");
    next();
  });
};

module.exports = auth;
