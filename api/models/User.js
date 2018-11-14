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

var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	spotifyId: String,
	musicProfile: MusicProfile
});


// User Schema Methods

/**
 * Creates and saves a User object in the database
 * @param {string} code
 * @returns {User} newly saved User object
 * @example
 * User.create("Joe Bruin")
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.create = function(code) {
	var userData = {};
	var accessToken;

	return SpotifyAdapter.getAccessToken(code)
		.then(token => {
			accessToken = token.access_token;
			return SpotifyAdapter.getUserInfo(accessToken);
		})
		.then(user => {
			userData.id = user.id;
			return SpotifyAdapter.getUserTopArtists(accessToken);
		})
		.then(artists => {
			userData.artists = artists;
			return SpotifyAdapter.getUserTopTracks(accessToken);
		})
		.then(tracks => {
			userData.tracks = tracks;

			var user = new this({
				_id: mongoose.Types.ObjectId(),
				spotifyId: userData.id,
				musicProfile: {
					artists: userData.artists,
					tracks: userData.tracks,
					genres: []
				}
			});

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
					reject('User with id ' + id + ' not found.');
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
					reject('User with Spotify id ' + spotId + ' not found.');
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