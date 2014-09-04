'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
    _      = require('underscore-contrib');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.type = 'local';
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {twitterId:twitter.id, username:twitter.username, displayName:twitter.displayName, photo:twitter.photos[0], type:'twitter'};
    User.collection.save(user, cb);
  });
};

User.githubAuthenticate = function(token, secret, github, cb){
  console.log('github in AUTH>>>>> ', github);
  User.collection.findOne({githubId:github.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {githubId:github.id, username:github.username, photo:github.avatar_url, type:'github'};
    User.collection.save(user, cb);
  });
};


User.googleAuthenticate = function(token, secret, google, cb){
  console.log('google in AUTH>>>>> ', google);
  User.collection.findOne({googleId:google.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {googleId:google.id, username:google.displayName, type:'google'};
    User.collection.save(user, cb);
  });
};

User.facebookAuthenticate = function(token, secret, facebook, cb){
  console.log('facebook in AUTH>>>>> ', facebook);
  User.collection.findOne({facebookId:facebook.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {facebookId:facebook.id, username:facebook.displayName, type:'facebook'};
    User.collection.save(user, cb);
  });
};

User.meetupAuthenticate = function(token, secret, meetup, cb){
  console.log('meetup in AUTH>>>>> ', meetup);
  User.collection.findOne({meetupId:meetup.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {meetupId:meetup.id, username:meetup.displayName, type:'meetup'};
    User.collection.save(user, cb);
  });
};

User.prototype.update = function(o, cb){
  this.email  = o.email;
  this.name   = o.name;
  this.phone  = o.phone;
  this.photo  = o.photo;

  User.collection.save(this, cb);
};

module.exports = User;

