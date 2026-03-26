const mongoose = require('mongoose');
const dbConnection = require('../controllers/db.controller');

const UtilistaurSchema = new mongoose.Schema({
  nom : {
    type: String,
    required: true,   
    unique: true      
  },
    somme : { 
        type: Number,
        default: 100
      }

});

const Utilistaur = dbConnection.model('Utilistaur', taskSchema, 'utilistaur');

module.exports = UtilistaurSchema;
module.exports.model = Utilistaur