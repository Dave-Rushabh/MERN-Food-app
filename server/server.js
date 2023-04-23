const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDB } = require("./db/dbConnection");
const { router } = require("./router/router");

const app = express();

connectToDB();

app.use(express.json());
app.use(cors());
dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `Server started on ${process.env.PORT}; if not responding, check port 3333`
  );
});

app.use("/api", router);
