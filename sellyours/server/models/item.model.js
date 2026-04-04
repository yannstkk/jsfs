const mongoose = require('mongoose');
const dbConnection = require('../controllers/db.controller');

const ItemSchema = new mongoose.Schema({
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

const Item = dbConnection.model('Item', ItemSchema, 'items');

module.exports = { schema: ItemSchema, model: Item };