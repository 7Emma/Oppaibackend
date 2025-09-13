// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Tentative de connexion MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connecté: ${conn.connection.host}`);
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
