const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const apiRoutes = require("./routes/api");
const pool = require("./config/db");

const app = express();

// Security + performance middleware
app.use(helmet());
app.use(compression());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - configure via env in production
const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));

// Logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || "120", 10),
});
app.use(limiter);

// Database connection (log only)
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

// API routes FIRST so /api/* are handled before static files
app.use("/api", apiRoutes);

// Serve frontend build if available
const buildPathEnv = process.env.FRONTEND_DIST_PATH;
const defaultBuildPath = path.join(__dirname, "..", "miniapp-frontend", "dist");
const buildPath = buildPathEnv ? path.resolve(buildPathEnv) : defaultBuildPath;

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Catch-all: serve index.html for non-API routes so client-side router handles routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // Frontend not built — respond with helpful message for non-API routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.status(503).send("Frontend not found. Build the frontend and place the files in the configured dist path.");
  });
}

// Basic health-check
app.get("/", (req, res) => {
  res.send("Mini-App Backend is running!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

module.exports = app;

