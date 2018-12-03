'use strict';

// Bring Mongoose into the app 
const mongoose = require('mongoose');
const config = require('../config');
const User = require('./User');

const mock = require('../mock-data');

// Build the connection string 
const dbURI = config.database.uri;

// Create the database connection 
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to ' + dbURI);

	/**
	 * Currently this runs every time continually putting more and more fake
	 * users into the DB. That is probably not ideal behavior.
	 **/
	
	loadMockData();
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	console.log('Mongoose default connection error: ' + err);
});

function loadMockData() {
	var deletePromises = mock.users.map(user => {
		return User.findBySpotifyId(user.spotifyId)
			.then(obj => {
				if (obj) {
					User.deleteById(obj._id);
				}
				return null;
			})
			.catch(err => {
				console.log("err writing obj: ", err, err.message);
			});
	});

	Promise.all(deletePromises)
		.then(_ => {
			var creationPromises = mock.users.map(profile => {
				var id;
				return User.create(profile.spotifyId)
					.then(user => {
						id = user._id;
						return User.updateProfile(id, profile);
					})
					.then(user => {
						return User.updateMusicProfile(id, profile);
					})
					.catch(err => console.log("got error " + err));
			});

			return Promise.all(creationPromises);
		})
		.then(_ => {
			console.log("Successfully loaded in mock users.");
		})
		.catch(err => console.log("err writing obj: ", err, err.message));
}

module.exports = {
	User: require('./User')
};