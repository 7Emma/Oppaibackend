const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");
const newsRoutes = require("./routes/new");
const publicationsRoutes = require("./routes/publications");

// Initialiser l'application
dotenv.config();
const app = express();

// Configuration CORS pour le développement et la production
const allowedOrigins = [
  "http://localhost:5173",
  "https://oppai-collective.vercel.app",
  "https://oppai-collective.netlify.app",
  process.env.API_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origine (mobile apps, postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // En développement, autoriser toutes les origines
      if (process.env.NODE_ENV === "development") {
        return callback(null, true);
      }

      callback(new Error("Non autorisé par CORS"));
    },
    credentials: true,
  })
);

// Middleware pour parser les requêtes JSON et urlencoded
app.use(express.json({ limit: "50mb" })); // augmenter à 50mb
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Servir les fichiers statiques
app.use(express.static("public"));

// Connecter à la base de données
connectDB();

// Définir les routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/publications", publicationsRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
