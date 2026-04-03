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

const Utilistaur = dbConnection.model('Utilistaur', UtilistaurSchema, 'utilistaur');

module.exports = UtilistaurSchema;
module.exports.model = Utilistaur