const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route de connexion : POST /api/auth/login
router.post("/login", authController.login);

module.exports = router;
