const User = require("../models/User");

// Fonction pour l'enregistrement d'un nouveau développeur
exports.registerDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const username = email.split("@")[0];

    user = new User({
      username,
      email,
      password,
      role: "developer",
    });

    await user.save();

    // Renvoyer l'utilisateur nouvellement créé
    res.status(201).json({
      message: "Développeur enregistré avec succès.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur de serveur." });
  }
};

// Fonction pour récupérer la liste des utilisateurs (utile pour l'admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur de serveur." });
  }
};

