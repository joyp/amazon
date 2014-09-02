'use strict';

exports.locals = function(req, res, next){
  res.locals.user = req.user;

  var keys = Object.keys(req.session.flash || {});
  res.locals.flash = {};
  keys.forEach(function(key){
    res.locals.flash[key] = [];
    req.session.flash[key].forEach(function(msg){
      res.locals.flash[key].push(req.flash(key));
    });
  });
  // pass an empty object if no flash, otherwise it would be null
  //res.locals.flash = req.session.flash || {};
  next();
};

exports.bounce = function(req, res, next){
  if(res.locals.user){
    next();
  }else{
    res.redirect('/login');
  }
};

