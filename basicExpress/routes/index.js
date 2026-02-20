var express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('../controllers/controller');



/* GET home page. */
router.get('/', controller.home);


router.get('/first', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/first.html'));
});

router.get('/second', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/second.html'));
});



module.exports = router;
