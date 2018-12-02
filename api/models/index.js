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
	mock.users.forEach(user => {
		User.findBySpotifyId(user.spotifyId)
			.then(obj => {
				if (obj) {
					User.deleteById(obj._id);
				}
			})
			.catch(err => {
				console.log("err writing obj: ", err, err.message);
			})
	})

	mock.users.forEach(profile => {
		var id;

		User.create(profile.spotifyId)
			.then(user => {
				id = user._id;
				return User.updateProfile(id, profile);
			})
			.then(user => {
				return User.updateMusicProfile(id, profile);
			})
			.catch(err => {
				console.log("got error " + err);
			})
	})
}

module.exports = {
	User: require('./User')
};