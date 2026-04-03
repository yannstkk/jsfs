const mongoose = require('mongoose');
const dbConnection = require('../controllers/db.controller');

const ObjetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  id_utilisateur: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Objet = dbConnection.model('Objet', ObjetSchema, 'objet');

module.exports = { schema: ObjetSchema, model: Objet };