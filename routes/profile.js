const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const auth = require('../middleware/auth');

//Créer ou mettre à jour un profil de développeur
router.post('/', auth, profileController.createOrUpdateProfile);

//Récupérer le profil du développeur actuel
router.get('/me', auth, profileController.getProfile);
router.get('/all', profileController.getAllProfiles);

module.exports = router;