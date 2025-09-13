const express = require("express");
const path = require("path");
const router = express.Router();
const News = require("../models/New");
const auth = require("../middleware/auth");
const multer = require("multer");

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Le dossier où les images seront sauvegardées
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    // Créer un nom de fichier unique et sécurisé
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//Créer une nouvelle publication
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    // req.file contiendra les informations du fichier téléchargé
    const {
      title,
      excerpt,
      content,
      author,
      date,
      category,
      readTime,
      featured,
    } = req.body;

    // Le chemin de l'image à stocker dans la base de données
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newNews = new News({
      title,
      excerpt,
      content,
      author,
      date,
      category,
      image: imagePath,
      readTime,
      featured,
      status: "pending",
    });

    const news = await newNews.save();
    res.status(201).json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});


// Récupérer les publications publiées (pour le public)

router.get("/", async (req, res) => {
  try {
    const publications = await News.find({ status: "approved" }).sort({
      date: -1,
    });
    res.json(publications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});
module.exports = router;
