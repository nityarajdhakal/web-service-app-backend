const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();
const pool = require("./config/db"); 

const app = express();


app.use(cors());
app.use(express.json());


pool.connect()
  .then(() => console.log(" Connected to PostgreSQL database"))
  .catch((err) => console.error(" Database connection error:", err));


app.use("/api", apiRoutes);


app.get("/", (req, res) => {
  res.send("Mini-App Backend is running!");
});

module.exports = app;

