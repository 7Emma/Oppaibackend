const ProfileDev = require("../models/ProfileDev");
const User = require("../models/User");

// Middleware pour la protection des routes (à adapter selon votre implémentation)
const auth = require("../middleware/auth"); // Assurez-vous que ce chemin est correct

//Créer ou mettre à jour un profil de développeur
exports.createOrUpdateProfile = async (req, res) => {
  const {
    name,
    role,
    image,
    technologies,
    speciality,
    description,
    portfolioLink,
    email,
    github,
    linkedin,
    projects,
    rating,
    gradient,
  } = req.body;

  // Construire l'objet profil
  const profileFields = {
    user: req.user.id,
    name,
    role,
    image,
    technologies,
    speciality,
    description,
    portfolioLink,
    email,
    github,
    linkedin,
    projects,
    rating,
    gradient,
  };

  try {
    let profile = await ProfileDev.findOne({ user: req.user.id });

    if (profile) {
      // Mettre à jour le profil existant
      profile = await ProfileDev.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json({ message: "Profil mis à jour", profile });
    }

    // Créer un nouveau profil
    profile = new ProfileDev(profileFields);
    await profile.save();
    res.status(201).json({ message: "Profil créé", profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur de serveur");
  }
};

//    Récupérer le profil du développeur actuel
exports.getProfile = async (req, res) => {
  try {
    const profile = await ProfileDev.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur de serveur");
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileDev.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur de serveur");
  }
};
