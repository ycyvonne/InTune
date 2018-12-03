'use strict';

const mongoose = require('mongoose');
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

var userSchema = new mongoose.Schema({
	spotifyId: String,
	artists: [String],
	tracks: [String],
	genres: [String],

	desired: [String],

	// public
	name: String,
	img: String,
	spotifyUrl: String,
	email: String,
	isArtist: {type: Boolean, default: false},
	matches: [String],
	concerts: [String]
});

// Util

/**
 * Return an appended array (needed for Mongoose).
 * @param {*} arr 
 * @param {*} val
 * @return {[*]} New array
 */
function app(arr, val) {
	var tmp = arr.slice();
	tmp.push(val);
	return tmp;
}

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

/**
 * Updates a user's profile to the DB.
 * @param {string} spotifyId
 * @param {*} profile
 * @returns {Promise} Promise which resolves to a User object or null
 */
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

/**
 * Updates a user's music profile to the DB.
 * @param {string} spotifyId
 * @param {*} profile
 * @returns {Promise} Promise which resolves to a User object or null
 */
userSchema.statics.updateProfile = function(id, profile) {
	return this.findById(id)
		.then(user => {
			user.name = profile.name;
			user.email = profile.email;
			user.spotifyUrl = profile.spotifyUrl;
			user.img = profile.img;
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

/**
 * Puts a "match" request from one user to another user.
 * @param {string} matcherId
 * @param {string} targetId
 * @returns {Promise} Promise which resolves to a User object or null
 */
userSchema.statics.match = function(matcherId, targetId) {
	var matcher, target;

	return this.findById(matcherId)
		.then(_matcher => {
			matcher = _matcher;

			return this.findById(targetId);
		})
		.then(_target => {
			target = _target;

			// Have to do this weird thing cuz we are using incompatible versions of
			// Mongo and Mongoose
			matcher.desired = app(matcher.desired, target._id);

			if (target.desired.includes(String(matcher._id).valueOf())) {

				if (!matcher.matches.includes(String(target._id).valueOf())) {
					matcher.matches = app(matcher.matches, target._id);
				}

				if (!target.matches.includes(String(target._id).valueOf())) {
					target.matches = app(target.matches, matcher._id);
				}
			}

			return new Promise((resolve, reject) => {
				target.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		})
		.then(_ => {
			return new Promise((resolve, reject) => {
				matcher.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
		})
}

/**
 * Checks if a user is matched with another.
 * @param {string} matcherId
 * @param {string} targetId
 * @returns {Promise} Promise which resolves to a User object or null
 */
userSchema.statics.hasMatch = function(matcherId, targetId) {
	var matcher, target;

	return this.findById(matcherId)
		.then(_matcher => {
			matcher = _matcher;
			return this.findById(targetId);
		})
		.then(_target => {
			target = _target;

			return matcher.matches.includes(String(target._id).valueOf());
		})
}

/**
 * Adds a concert to the user objects
 * @param {string} uid The user id
 * @param {string} cid The concert id
 * @returns {Promise} Promise which resolves to a User object or null
 */
userSchema.statics.addConcert = function(uid, cid) {
	return this.findById(uid)
		.then(user => {
			if (!user.concerts.includes(cid)) {
				user.concerts = app(user.concerts, cid);
			}
			return new Promise((resolve, reject) => {
				user.save((err, newUser) => {
					if (err) reject(err);
					else resolve(newUser);
				});
			});
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
 * @returns {Promise} Promise which resolves to a User object or null
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
 * @returns {Promise} Promise which resolves to a User object or null
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