const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Invalid Request !",
    });
  }

  try {
    const userProfile = await User.findById(id, {
      password: 0,
      updatedAt: 0,
      createdAt: 0,
      __v: 0,
    });
    if (!userProfile) {
      return res.status(404).json({
        message: "User details not found !",
      });
    }
    return res.status(200).json({ data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Invalid Request !",
    });
  }

  try {
    const userProfile = await User.findById(id);
    if (!userProfile) {
      return res.status(404).json({
        message: "User details not found !",
      });
    }

    userProfile.username = req.body.username || userProfile.username;
    userProfile.dateOfBirth = req.body.dateOfBirth || userProfile.dateOfBirth;
    userProfile.email = req.body.email || userProfile.email;
    userProfile.contactNo = req.body.contactNo || userProfile.contactNo;
    userProfile.updatedAt = new Date();

    const updatedUser = await userProfile.save();

    // Exclude fields from the response
    const responseUser = await User.findById(updatedUser._id, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
    });

    return res.status(200).json({
      data: responseUser,
      message: "Profile Details Updated Successfully !",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = { getUserProfile, updateUserProfile };
