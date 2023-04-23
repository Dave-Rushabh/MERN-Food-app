const express = require("express");
const { handleSignUp, handleLogin } = require("../controllers/authController");

// using express's Router for routing the requests
const router = express.Router();

// ===================================== creating the endpoints =====================================

// ========== SIGN UP ==========
router.route("/sign-up").post(handleSignUp);

// ========== LOG IN ==========
router.route("/login").post(handleLogin);

module.exports = { router };
