const express = require('express');
const router = express.Router();
const accessController = require('../controllers/access.controller');

router.post('/register', accessController.register);
router.post('/login', accessController.login);
router.post('/logout', accessController.logout);

module.exports = router;
