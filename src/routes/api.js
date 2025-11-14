const express = require("express");
const { login } = require("../controllers/authController");
const { getProducts, updateProduct } = require("../controllers/productController");
const { getTranslations } = require("../controllers/translationController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/auth/login", login);
router.get("/translations", getTranslations);

// Protected routes
router.get("/products", authenticateToken, getProducts);
router.put("/products/:id", authenticateToken, updateProduct);

module.exports = router;

