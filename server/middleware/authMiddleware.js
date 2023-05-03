const jwt = require("jsonwebtoken");
const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

const authMiddlware = expressAsyncHandler(async (req, res, next) => {
  if (
    req?.headers?.authorization?.startsWith("Bearer") &&
    req.headers.authorization?.split(" ")[1]
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(isValidToken.userId, { password: 0 });
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token found" });
  }
});

module.exports = { authMiddlware };
