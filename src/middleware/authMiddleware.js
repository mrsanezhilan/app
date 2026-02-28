const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // No header
    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    // Expected format: Bearer TOKEN
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
