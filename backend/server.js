const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/user", userRoutes);
app.use("/api/profiles", profileRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conected")).catch((error) => console.log(error.message)
  )

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on PORT " + (process.env.PORT || 5000));
});
