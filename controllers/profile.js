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

  // Validation des champs obligatoires
  if (
    !name ||
    !role ||
    !image ||
    !speciality ||
    !description ||
    !email ||
    projects === undefined ||
    rating === undefined ||
    !gradient
  ) {
    return res.status(400).json({
      message:
        "Les champs name, role, image, speciality, description, email, projects, rating et gradient sont obligatoires",
    });
  }

  // Validation des technologies
  if (
    !technologies ||
    !Array.isArray(technologies) ||
    technologies.length === 0
  ) {
    return res.status(400).json({
      message: "Au moins une technologie est requise",
    });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Format d'email invalide",
    });
  }

  // Validation de la note (0-5)
  if (rating < 0 || rating > 5) {
    return res.status(400).json({
      message: "La note doit être entre 0 et 5",
    });
  }

  // Validation du nombre de projets
  if (projects < 0) {
    return res.status(400).json({
      message: "Le nombre de projets ne peut pas être négatif",
    });
  }

  // Construire l'objet profil
  const profileFields = {
    user: req.user.id,
    name: name.trim(),
    role: role.trim(),
    image,
    technologies: technologies
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0),
    speciality: speciality.trim(),
    description: description.trim(),
    portfolioLink: portfolioLink ? portfolioLink.trim() : "",
    email: email.trim().toLowerCase(),
    github: github ? github.trim() : "",
    linkedin: linkedin ? linkedin.trim() : "",
    projects: Number(projects),
    rating: Number(rating),
    gradient: gradient.trim(),
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
    console.error("Erreur lors de la création/mise à jour du profil:", err);

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: "Erreur de validation",
        errors,
      });
    }

    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création du profil" });
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
    const profiles = await ProfileDev.find().populate(
      "user",
      "username email role"
    );
    res.json(profiles);
  } catch (err) {
    console.error("Erreur lors de la récupération des profils:", err);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des profils" });
  }
};
