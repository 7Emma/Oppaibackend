const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Générer un code temporaire
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.login = async (req, res) => {
  const { username, code } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Si aucun code envoyé, générer un nouveau code et l’envoyer
    if (!code) {
      const newCode = generateCode();
      user.loginCode = newCode;
      user.codeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await user.save();

      await sendEmail({
        to: user.email,
        subject: "Votre code de connexion Oppai",
        code: newCode,
        name: user.username,
      });

      return res.json({ message: "Code envoyé à votre email." });
    }

    // Vérifier le code
    if (user.loginCode !== code || user.codeExpires < new Date()) {
      return res.status(400).json({ message: "Code invalide ou expiré." });
    }

    // Créer le token JWT
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Reset du code après validation
    user.loginCode = null;
    user.codeExpires = null;
    await user.save();

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
