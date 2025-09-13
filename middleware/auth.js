const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Récupérer le token depuis le header de la requête
  const token = req.header('x-auth-token');

  // 2. Vérifier si un token existe
  if (!token) {
    return res.status(401).json({ message: 'Aucun token, autorisation refusée.' });
  }

  // 3. Vérifier et décoder le token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token non valide.' });
  }
};