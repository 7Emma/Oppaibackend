const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const adminController = require("../controllers/admin");
const News = require("../models/New");
const User = require("../models/User");

// Endpoint protégé pour les administrateurs seulement
router.get("/users", auth, role("admin"), adminController.getUsers);

// Route pour l'enregistrement d'un nouvel utilisateur par l'admin
router.post(
  "/register-developer",
  auth,
  role("admin"),
  adminController.registerDeveloper
);

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.patch("/users/:id/toggle-status", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --- PUBLICATIONS ---
// Récupérer toutes les publications ou celles en attente
router.get("/publications", auth, role("admin"), async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const publications = await News.find(filter).sort({ createdAt: -1 });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Approuver une publication
router.patch(
  "/publications/:id/approve",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const pub = await News.findById(req.params.id);
      if (!pub)
        return res.status(404).json({ message: "Publication introuvable" });

      pub.status = "approved";
      await pub.save();

      res.json({ message: "Publication approuvée", publication: pub });
    } catch (err) {
      // Affichez l'erreur exacte dans la console du serveur
      console.error(err.message);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// Rejeter une publication
router.patch(
  "/publications/:id/reject",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const pub = await News.findById(req.params.id);
      if (!pub)
        return res.status(404).json({ message: "Publication introuvable" });

      pub.status = "rejected";
      await pub.save();

      res.json({ message: "Publication rejetée", publication: pub });
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

module.exports = router;
