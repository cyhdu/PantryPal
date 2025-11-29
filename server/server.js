const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
console.log("Loading users routes...");
app.use("/api/users", require("./routes/users"));
console.log("Users route LOADED!");


app.listen(3000, () => {
  console.log("Server running on port 3000");
});