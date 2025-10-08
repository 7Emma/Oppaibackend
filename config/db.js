// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Tentative de connexion MongoDB...");
    console.log("URI utilisée:", process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    console.log(`Base de données: ${conn.connection.name}`);
  } catch (err) {
    console.error(`Erreur de connexion à MongoDB: ${err.message}`);
    console.log(
      "URI utilisée:",
      process.env.MONGODB_URI ? "présente" : "manquante"
    );
    process.exit(1);
  }
};

module.exports = connectDB;
