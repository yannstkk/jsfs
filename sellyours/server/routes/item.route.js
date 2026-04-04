const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middlewares/authentication.middleware');

router.get('/mine',        authMiddleware.validToken, itemController.listMine);
router.get('/others',      authMiddleware.validToken, itemController.listOthers);
router.post('/',           authMiddleware.validToken, itemController.create);
router.delete('/:itemId',  authMiddleware.validToken, itemController.remove);
router.put('/buy/:itemId', authMiddleware.validToken, itemController.buy);
router.put('/:itemId',     authMiddleware.validToken, itemController.updatePrice);

module.exports = router;