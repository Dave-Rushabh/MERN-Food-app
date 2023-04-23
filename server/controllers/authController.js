const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

const handleSignUp = expressAsyncHandler(async (req, res) => {
  try {
    // Extract user input data from request body
    const { username, dateOfBirth, email, contactNo, countryCode, password } =
      req.body;

    // Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user document and save it to the database in one step
    const newUser = await User.create({
      username,
      dateOfBirth: new Date(dateOfBirth),
      email,
      contactNo,
      countryCode,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const payload = { userId: newUser._id, email: newUser.email };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secretKey, options);

    // Return the token and user data in the response
    res.status(201).json({
      token,
      user: { id: newUser._id, username, email, contactNo, countryCode },
      message: "🎉 Congrats ! Your account is created successfully 🥳",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const handleLogin = expressAsyncHandler(async (req, res) => {
  try {
    // Extract user input data from request body
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "The provided email does not exist in our system !",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password !" });
    }

    // Generate a JWT token for the authenticated user
    const payload = { userId: user._id, email: user.email };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secretKey, options);

    // Return the token and user data in the response
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
      message: "🎉 Login successful ! 🥳",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { handleSignUp, handleLogin };
