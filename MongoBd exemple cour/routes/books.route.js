const express = require('express');
const router = express.Router();

// import controller for books
const booksController = require('../controllers/books.controller');

// associate controller method to path and method
router.get('/', booksController.list);
router.get('/then', booksController.listThen);

router.get('/one', booksController.oneBook);
router.get('/dune', booksController.dune);
router.get('/after/:year/v1', booksController.booksAfter2000v1);
router.get('/after/:year/v2', booksController.booksAfter2000v2);
router.get('/details/:bookId', booksController.details);


// path '/books/' can be accessed using POST (for book creation)
router.post('/', booksController.create);
router.post('/create', booksController.create); // (pour compatibilité URL vidéo cours)

// export books route
module.exports = router;
