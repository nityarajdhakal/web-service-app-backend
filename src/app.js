const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ add this
const apiRoutes = require("./routes/api");
require("dotenv").config();
const pool = require("./config/db"); 

const app = express();

app.use(cors());
app.use(express.json());

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

// API routes
app.use("/api", apiRoutes);

// Serve frontend build (React)
app.use(express.static(path.join(__dirname, "frontend/build"))); // adjust path if needed

// Catch-all route: send index.html for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Optional root route
app.get("/", (req, res) => {
  res.send("Mini-App Backend is running!");
});

module.exports = app;
