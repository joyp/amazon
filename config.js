'use strict';

var config = {};

config.twitter = {
  apiKey      : 'L25SRKoFYyuDhdXJB0QUxh25E',
  apiSecret   : process.env.TWITTER_SECRET,
  callbackUrl : 'http://nss-vm.com:3333/auth/twitter/callback'
};

config.github = {
  clientId      : 'f410e04adb1f1d4b8fd6',
  clientSecret  : process.env.GH_SECRET,
  callbackUrl   : 'http://nss-vm.com:3333/auth/github/callback'
};

config.google = {
  clientId      : '540982275900-shveckld67jfi2665oqofdibi9t17s2l.apps.googleusercontent.com',
  clientSecret  : process.env.GOOGLE_SECRET,
  callbackUrl   : 'http://nss-vm.com:3333/auth/google/callback'
};

config.facebook = {
  clientId      : '521274734670162',
  clientSecret  : process.env.FB_SECRET,
  callbackUrl   : 'http://nss-vm.com:3333/auth/facebook/callback'
};

config.meetup = {
  consumerKey   : 'peu9lakcnho8uhac952nim4krc',
  consumerSecret: process.env.MEETUP_SECRET,
  callbackUrl   : 'http://nss-vm.com:3333/auth/meetup/callback'
};

module.exports = config;
