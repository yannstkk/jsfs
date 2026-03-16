const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// connexion à la base de données
const dbConnection = require('./controllers/db.controller.js');

// define routers
const booksRouter = require('./routes/books.route');

// define middlewares
const error = require('./middlewares/error.middleware');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// global middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes middlewares
app.use('/books', booksRouter);

// in all other cases use error middleware
app.use(error);

module.exports = app;
