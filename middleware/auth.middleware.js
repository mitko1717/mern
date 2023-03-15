// function to intercept some data

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // check server is available
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      // if no user authorization
      return res.status(401).json({ message: "no user authorization" });
    }

    // uncrypted token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // add in user field
    req.user = decoded;
    next(); // for continuing of request handling
  } catch (e) {
    res.status(401).json({ message: "no user authorization" });
  }
};
