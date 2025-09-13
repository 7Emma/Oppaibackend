const mongoose = require("mongoose");

const ProfileDevSchema = new mongoose.Schema({
  // L'ID de l'utilisateur auquel ce profil est lié
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
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
  },
  rating: {
    type: Number,
    required: true,
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
