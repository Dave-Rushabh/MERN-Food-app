const express = require("express");
const {
  handleSignUp,
  handleLogin,
  validateToken,
} = require("../controllers/authController");

// using express's Router for routing the requests
const router = express.Router();

// ===================================== creating the endpoints =====================================

// ========== SIGN UP ==========
router.route("/sign-up").post(handleSignUp);

// ========== LOG IN ==========
router.route("/login").post(handleLogin);

// ========== VALIDATE TOKEN ==========
router.route("/validate-token").post(validateToken);

module.exports = { router };
