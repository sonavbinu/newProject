const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth;
