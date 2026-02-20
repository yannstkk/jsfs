const express = require('express');
const router = express.Router();



router.get('/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100)+1;
    res.json({ randomNumber });
});

router.get('/echo', (req, res) => {
    res.json({queryParameters: req.query});
});


module.exports = router;