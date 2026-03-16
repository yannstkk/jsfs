const mongoose = require('mongoose');

// definition of schema for books
const bookSchema = new mongoose.Schema({
  title : String,
  author : String,
  cover : String,
  year : Number
});

// export the schema
module.exports = bookSchema;


// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/db.controller');
const Books = dbConnection.model('Book',bookSchema,'books');

// export the model
module.exports.model = Books;
