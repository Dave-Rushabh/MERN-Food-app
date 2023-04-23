const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    return conn;
  } catch (err) {
    console.log("Error connecting to database. Exiting...");
    console.log(err);
    throw new Error("Failed to connect to database");
  }
};

module.exports = { connectToDB };
