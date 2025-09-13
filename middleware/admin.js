module.exports = function(req, res, next) {
  // Supposons que l'objet 'user' est attaché à la requête par le middleware 'auth'
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Accès non autorisé' });
  }
  next();
};