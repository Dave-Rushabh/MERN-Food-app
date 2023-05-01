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
    const userProfile = await User.findById(id, { password: 0 });
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

module.exports = { getUserProfile };
