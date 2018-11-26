'use strict';

const mongoose = require('mongoose');
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

// User Schema Definition
var MusicProfile = new mongoose.Schema({
	artists: [String],
	tracks: [String],
	genres: [String]
});

var UserProfile = new mongoose.Schema({
	name: String,
	img: String,
	spotifyUrl: String,
	email: String
});

var userSchema = new mongoose.Schema({
	spotifyId: String,
	musicProfile: MusicProfile,
	profile: UserProfile,
	artists: [String],
	tracks: [String],
	genres: [String],

	// public
	name: String,
	img: String,
	spotifyUrl: String,
	email: String
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
 * Gets all User objects in the database
 * @returns {[User]} User objects
 * @example
 * User.findAll(id)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findAll = function() {
	return new Promise((resolve, reject) => {
		this.find({}, (error, users) => {
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