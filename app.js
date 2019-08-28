const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


import cors from 'cors';
import helmet from 'helmet';

import 'dotenv/config';
require('./src/database/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import indexRouter from "./src/routes/base";
import usersRouter from "./src/routes/user";
import categoryRouter from "./src/routes/category";
import productRouter from "./src/routes/product";
import metricRouter from "./src/routes/metric";
import cartRouter from "./src/routes/cart";

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/metric', metricRouter);
app.use('/cart', cartRouter);


app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
