const express = require('express');
const router = express.Router();
const objetController = require('../controllers/objet.controller');
const authMiddleware = require('../middlewares/authentication.middleware');

router.get('/mine', authMiddleware.validToken, objetController.listMine);
router.get('/others', authMiddleware.validToken, objetController.listOthers);
router.post('/', authMiddleware.validToken, objetController.create);
router.delete('/:itemId', authMiddleware.validToken, objetController.remove);
router.put('/buy/:itemId', authMiddleware.validToken, objetController.buy);
router.put('/:itemId', authMiddleware.validToken, objetController.updatePrice);


module.exports = router;
