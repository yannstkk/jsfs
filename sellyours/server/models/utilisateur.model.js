const mongoose = require('mongoose');
const dbConnection = require('../controllers/db.controller');

const UtilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  somme: {
    type: Number,
    default: 100
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Utilisateur = dbConnection.model('Utilisateur', UtilisateurSchema, 'utilisateur');

module.exports = { schema: UtilisateurSchema, model: Utilisateur };