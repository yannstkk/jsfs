const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const validToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(`erreur JWT : ${err.message}`);
    if (req.headers['sec-fetch-dest'] === 'empty') {
      res.status(401).json({ redirectTo: '/access/login' });
    } else {
      res.status(301).redirect('/access/login');
    }
  }
};

module.exports = { validToken };
