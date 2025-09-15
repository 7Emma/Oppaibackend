const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
const newsRoutes = require("./routes/new");

// Initialiser l'application
dotenv.config();
const app = express();

const allowedOrigin = process.env.API_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Middleware pour parser les requêtes JSON
app.use(express.json({ extended: false }));
app.use(express.static('public'));

// Middleware pour parser les requêtes JSON et urlencoded
app.use(express.json({ limit: "10mb" })); // augmenter à 50mb
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connecter à la base de données
connectDB();

// Définir les routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/news", newsRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
