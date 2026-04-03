const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');
const authMiddleware = require('../middlewares/authentication.middleware');

router.get('/me', authMiddleware.validToken, utilisateurController.me);
router.put('/me', authMiddleware.validToken, utilisateurController.update);

module.exports = router;