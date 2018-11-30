'use strict';

const mongoose = require('mongoose');
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

var userSchema = new mongoose.Schema({
	spotifyId: String,
	artists: {type: [String], default: []},
	tracks: {type: [String], default: []},
	genres: {type: [String], default: []},

	desired: {type: [String], default: []},

	// public
	name: String,
	img: String,
	spotifyUrl: String,
	email: String,
	isArtist: {type: Boolean, default: false},
	matches: {type: [String], default: []}
});

// User Schema Methods

/**
 * Creates and saves a User object in the database
 * @param {string} spotifyId
 * @returns {User} newly saved User object
 * @example
 * User.create(id)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.create = function(sid) {
	var user = new this({
		spotifyId: sid
	});

	return new Promise((resolve, reject) => {
		user.save((err, newUser) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(newUser);
			}
		})
	})
};

userSchema.statics.updateMusicProfile = function(id, profile) {
	return this.findById(id)
		.then(user => {
			user.tracks = profile.tracks;
			user.artists = profile.artists;
			user.genres = profile.genres;

			return new Promise((resolve, reject) => {
				user.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		});
};

userSchema.statics.updateProfile = function(id, profile) {
	return this.findById(id)
		.then(user => {

			user.name = profile.name;
			user.img = profile.img;
			user.spotifyUrl = profile.spotifyUrl;
			user.email = profile.email;
			user.isArtist = profile.isArtist;

			return new Promise((resolve, reject) => {
				user.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		});
};

/**
 * Gets a single User by id
 * @param {string} User id
 * @returns {User} User object
 * @example
 * User.findById(id)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findById = function(id) {
	return new Promise((resolve, reject) => {
		this.find({_id: id}, (error, user) => {
			if (error) reject(error);
			else {
				if (user.length >= 1) {
					resolve(user[0]);
				}
				else {
					resolve(null);
				}
			}
		});
	});
};

/**
 * Gets a singleUser by Spotify ID
 * @returns {} User object
 * @example
 * User.findBySpotifyId(id)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findBySpotifyId = function(spotId) {
	return new Promise((resolve, reject) => {
		this.find({spotifyId: spotId}, (error, user) => {
			if (error) reject(error);
			else {
				if (user.length >= 1) {
					resolve(user[0]);
				}
				else {
					resolve(null);
				}
			}
		})
	})
}

userSchema.statics.match = function(matcherId, targetId) {
	var matcher, target;

	return this.findById(matcherId)
		.then(_matcher => {
			matcher = _matcher;

			return this.findById(targetId);
		})
		.then(_target => {
			target = _target;

			// This needs to be "concat" instead of "push" because Mongo is weird
			matcher.desired.concat(target._id);

			if (target.desired.includes(matcher._id)) {
				matcher.matches.concat(target._id);
				target.matches.concat(matcher._id);
			}

			return new Promise((resolve, reject) => {
				target.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		})
		.then(newTarget => {
			return new Promise((resolve, reject) => {
				matcher.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		})
}

userSchema.statics.hasMatch = function(matcherId, targetId) {
	var matcher, target;

	return this.findById(matcherId)
		.then(_matcher => {
			matcher = _matcher;
			return this.findById(targetId);
		})
		.then(_target => {
			target = _target;

			return matcher.matches.includes(target._id);
		})
}

/**
 * Gets all User objects in the database
 * @returns {[User]} User objects
 * @example
 * User.findAll(id)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findAll = function(isArtist=false) {
	return new Promise((resolve, reject) => {
		this.find({isArtist: isArtist}, (error, users) => {
			if (error) reject(error);
			else resolve(users);
		});
	});
};

/**
 * Deletes a single User object in the database
 * @param {string} User id
 * @example
 * User.deleteById(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.deleteById = function(id) {
	return new Promise((resolve, reject) => {
		this.remove({_id: id}, (error, user) => {
			if (error) reject(error);
			else resolve(user);
		});
	});
};

/**
 * Deletes all users from the database
 * @example
 * User.deleteById(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.deleteAll = function() {
	return new Promise((resolve, reject) => {
		this.remove({}, (error, users) => {
			if (error) reject(error);
			else resolve(users);
		});
	});
}

module.exports = mongoose.model('User', userSchema);