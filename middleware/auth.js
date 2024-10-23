const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from Authorization header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract the token from the "Bearer <token>" format
  const bearerToken = token.split(" ")[1];

  // Verify token
  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
