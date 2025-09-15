const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route de connexion : POST /api/auth/login
router.post("/login", authController.login);

// Routes supplémentaires pour le frontend
router.post("/send-code", authController.sendCode);
router.post("/verify-code", authController.verifyCode);

module.exports = router;
