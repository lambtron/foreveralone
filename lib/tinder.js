
/**
 * Module dependencies.
 */

 var Tinderjs = require('tinderjs').TinderClient;
 var thunkify = require('thunkify-wrap');
 var _ = require('lodash');

/**
 * Expose `Tinder`.
 */

module.exports = Tinder;

/**
 * Instantiate a new `Tinder`.
 */

function Tinder(id, token) {
  if (!(this instanceof Tinder)) return new Tinder(id, token);
  this.tinderjs = new Tinderjs();
  this.authenticated = false;
  this.id = id;
  this.token = token;
}

/**
 * Get history.
 */

Tinder.prototype.getHistory = function *() {
  if (!this.authenticated) return;
  var getHistory = thunkify(this.tinderjs.getHistory);
  return yield getHistory();
  // var tinder = yield getHistory();
  // return parse(tinder.matches);
};

/**
 * Get user info.
 */

Tinder.prototype.getUser = function *() {
  if (!this.authenticated || !this.tinderjs.defaults) return;
  return {
    bio: this.tinderjs.defaults.user.bio,
    birthDate: this.tinderjs.defaults.user.birth_date,
    photos: parsePhotos(this.tinderjs.defaults.user.photos)
  };
};

/**
 * Authenticate.
 */

Tinder.prototype.authenticate = function *() {
  this.authenticated = false;
  var authenticate = thunkify(this.tinderjs.authorize);
  yield authenticate(this.token, this.id);
  if (this.tinderjs.userId) this.authenticated = true;
  return;
};

/**
 * Private helper function to parse matches into proper format.
 */

function parse(matches) {
  // todo: sort by .id?
  return _.compact(_.map(matches, function(match) {
    if (!match.person) return null;
    return {
      id: match.person._id,
      bio: match.person.bio || '',
      name: match.person.name || '',
      gender: match.person.gender || '',
      birthDate: match.person.birth_date || '',
      photos: parsePhotos(match.person.photos) || []
      // messages: parseMsg(match.messages) || []
    };
  }));
}

/**
 * Private helper function to parse photos object.
 */

function parsePhotos(photos) {
  return _.compact(_.map(photos, function(photo) {
    return photo.url;
  }));
}

/**
 * Private helper function to parse messages object.
 */

function parseMsg(messages) {
  return _.compact(_.map(messages, function(msg) {
    return {
      to: msg.to,
      from: msg.from,
      body: msg.message,
      timestamp: msg.timestamp
    };
  }));
}
