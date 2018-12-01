'use strict';

// Bring Mongoose into the app 
const mongoose = require('mongoose');
const config = require('../config');
const User = require('./User');

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
	var profiles = [];

	for (var i=0; i < 10; i++) {
		profiles.push({
			sid: i.toString(),
			profile: {
				name: "John Smith " + i.toString(),
				img: "https://robertzalog.com/me.jpg",
				email: "jsmith@gmail.com",
				spotifyUrl: "https://robertzalog.com",
				isArtist: false
			},
			music_profile: {
				artists: [],
				genres: [],
				tracks: []
			},
			test_match: "5c01bc5bbf694a0017d23670"
		});
	}

	profiles.forEach(profile => {
		var id;

		User.create(profile.sid)
			.then(user => {
				id = user._id;
				return User.updateProfile(id, profile.profile);
			})
			.then(user => {
				return User.updateMusicProfile(id, profile.music_profile);
			})
			.then(user => {
				User.match(user._id, profile.test_match)
			})
			.catch(err => {
				console.log("got error " + err + ", " + err.message);
			});
	});
}

module.exports = {
	User: require('./User')
};