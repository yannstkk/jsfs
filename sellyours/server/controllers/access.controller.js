const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur.model').model;
const jwtConfig = require('../config/jwt.config');


const register = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const userData = {
      ...req.body,
      password: hashPassword
    };
    const newUser = await Utilisateur.create(userData);
    delete userData.password;
    res.status(201).json(userData);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


const login = async (req, res) => {
  try {
    const user = await Utilisateur.findOne({ login: req.body.login });
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: 'mot de passe incorrect' });

      const token = jwt.sign({ id: user._id }, jwtConfig.SECRET_TOKEN, { expiresIn: '1h' });
      res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: 'strict' });
      res.status(200).json({ message: 'utilisateur connecté' });
    } else {
      res.status(401).json({ message: `utilisateur ${req.body.login} inconnu` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 2000, httpOnly: true, sameSite: 'strict' });
  res.status(200).json({ message: 'utilisateur déconnecté' });
};


module.exports = { register, login, logout };