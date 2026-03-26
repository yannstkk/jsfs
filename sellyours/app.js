const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./controllers/db.controller');

const indexRouter = require('./routes/".....".route');
const objetRouter  = require('./routes/"....".route');
const utilistaeurRouter  = require('./routes/"....".route');


const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/item', itemRouter);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.handleError);

module.exports = app;