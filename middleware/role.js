module.exports = (roles = []) => {
  // Assure que 'roles' est un tableau
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    // Vérifier si le rôle de l'utilisateur est inclus dans les rôles autorisés
    if (req.user && roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès non autorisé.' });
    }

    next();
  };
};