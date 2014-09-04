'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);

  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', successFlash:'Login successful!', failureFlash:'Sorry, your login was incorrect.'}));
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash:'Twitter login successful!', failureFlash:'Sorry, your Twitter login was unsuccessful.'}));
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {successRedirect:'/', failureRedirect:'/login', successFlash:'Github login successful!', failureFlash:'Sorry, your Github login was unsuccessful.'}));
  app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', passport.authenticate('google', {successRedirect:'/', failureRedirect:'/login', successFlash:'Google login successful!', failureFlash:'Sorry, your Google login was unsuccessful.'}));
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login', successFlash:'Facebook login successful!', failureFlash:'Sorry, your Facebook login was unsuccessful.'}));
  app.get('/auth/meetup', passport.authenticate('meetup'));
  app.get('/auth/meetup/callback', passport.authenticate('meetup', {successRedirect:'/', failureRedirect:'/login', successFlash:'Meetup login successful!', failureFlash:'Sorry, your Meetup login was unsuccessful.'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);

  app.get('/profile', users.show);
  app.post('/profile', users.update);
  app.get('/profile/edit', users.edit);

  console.log('Express: Routes Loaded');
};

