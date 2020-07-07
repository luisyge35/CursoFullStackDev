require('dotenv').config();
const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const passport      = require('passport');
const User          = require('./models/user');
const session       = require('express-session');
const mongoose      = require('mongoose');
const methodOverride = require('method-override')
// Require routes
const indexRouter   = require('./routes/index');
const postsRouter   = require('./routes/posts');
const reviewsRouter = require('./routes/reviews')

const app = express();

// Conectar a data base
mongoose.connect('mongodb+srv://test:test@surf-shop.ctdgo.gcp.mongodb.net/surf-shop-mapbox?retryWrites=true&w=majority', 
                {useNewUrlParser: true,
                 useUnifiedTopology: true
                });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
      console.log('CONNECTED TO MONGODB!!!')
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// Configure passport and Sessions (importante configurar sessions antes que passport)
app.use(session({
  secret: 'oso',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);

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
