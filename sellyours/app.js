const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./controllers/db.controller');

const indexRouter = require('./routes/index.route');
const itemRouter = require('./routes/item.route');
const utilisateurRouter = require('./routes/utilisateur.route');
const accessRouter = require('./routes/access.route');


const errorMiddleware = require('./middlewares/error.middleware');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/item', itemRouter);
app.use('/user', utilisateurRouter);
app.use('/access', accessRouter);


app.use(errorMiddleware.notFound);
app.use(errorMiddleware.handleError);

module.exports = app;