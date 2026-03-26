const mongoose = require('mongoose');
const dbConnection = require('../controllers/db.controller');

const ObjetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,   
    unique: true      
  },
  prix: { type: Number },

  id_utilisateur : mongoose.Types.ObjectId

});

const Objet = dbConnection.model('Objet', taskSchema, 'objet');

module.exports = ObjetSchema;
module.exports.model = Objet