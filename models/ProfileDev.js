const mongoose = require("mongoose");

const ProfileDevSchema = new mongoose.Schema({
  // L'ID de l'utilisateur auquel ce profil est lié
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  portfolioLink: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Format d'email invalide",
    },
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  projects: {
    type: Number,
    required: true,
    min: [0, "Le nombre de projets ne peut pas être négatif"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "La note ne peut pas être inférieure à 0"],
    max: [5, "La note ne peut pas être supérieure à 5"],
  },
  gradient: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profiledev", ProfileDevSchema);
