const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Générer un code temporaire
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.login = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Si pas de code fourni, générer et envoyer le code
    if (!code) {
      const newCode = generateCode();
      user.loginCode = newCode;
      user.codeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await user.save();

      await sendEmail({
        to: user.email,
        code: newCode,
        templateId: 2, // ton template
      });

      return res.json({ message: "Code envoyé à votre email." });
    }

    // Vérification du code
    if (user.loginCode !== code || user.codeExpires < new Date()) {
      return res.status(400).json({ message: "Code invalide ou expiré." });
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Reset du code
    user.loginCode = null;
    user.codeExpires = null;
    await user.save();

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
