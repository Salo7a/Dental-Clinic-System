const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models/index');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const engine = require('ejs-mate');
var passportConfig = require('./config/passport');


const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

//Load Environment Variables From .env File

require('dotenv').config();

//Database Connection Test
db.sequelize
    .authenticate() //will cause an error if you don't have the database  :D "bdeehyat"
    .then(() => console.log('DB Connection Successful'))
    .catch(err => console.log('Error: ' + err));

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'node_modules/admin-lte/dist')));
app.use('/plugins', express.static(path.join(__dirname, 'node_modules/admin-lte/plugins')));


//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Auth Middleware
app.use(passport.initialize());
app.use(passport.session());
//Flash
app.use(flash());

//Global Flashes
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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
