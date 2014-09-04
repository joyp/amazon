'use strict';

var MeetupStrategy  = require('passport-meetup').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config'),
    meetup          = new MeetupStrategy({consumerKey: config.meetup.consumerKey, consumerSecret: config.meetup.consumerSecret, callbackURL: config.meetup.callbackUrl},
                        User.meetupAuthenticate);

module.exports = meetup;

