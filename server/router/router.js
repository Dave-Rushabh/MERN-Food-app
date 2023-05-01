const express = require("express");
const {
  handleSignUp,
  handleLogin,
  validateToken,
} = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userProfileController");

// using express's Router for routing the requests
const router = express.Router();

// ===================================== creating the endpoints =====================================

// 1.) ========== SIGN UP ==========
router.route("/sign-up").post(handleSignUp);

// 2.) ========== LOG IN ==========
router.route("/login").post(handleLogin);

// 3.) ========== VALIDATE TOKEN ==========
router.route("/validate-token").post(validateToken);

// 4.) ========== USER PROFILE DETAILS ==========

// 4.1) ==== GET USER DETAILS ====
router.route("/user/:id").get(getUserProfile);

module.exports = { router };
