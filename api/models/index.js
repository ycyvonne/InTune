'use strict';

// Bring Mongoose into the app 
const mongoose = require('mongoose');
const config = require('../config');
const User = require('./User');
const Concert = require('./Concert');
const SongkickAdapter = require('../adapters/SongkickAdapter');

const mock = require('../mock-data');

// Build the connection string 
const dbURI = config.database.uri;

// Create the database connection 
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Mongoose default connection open to ' + dbURI);

	//load concert data
	loadMockConcerts();

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

/**
 * Loads mock user data.
 * @returns {void}
 */
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

/**
 * Checks that concert exists or creates it.
 * @param {*} id 
 * @param {*} concertData 
 * @return {Promise} Resolves to Concert object
 */
function checkConcert(id,concertData) {
	return Concert.findByConcertId(id)
	  .then(concert => {
		if(concert === null)
		{
		  Concert.create(id, concertData)
		  .then(data => {
		  })
		}
	  })
  }

/**
 * Load mock concerts.
 * @return {void}
 */
function loadMockConcerts() {
	SongkickAdapter.getEventsByMetroArea({})
    .then(function(concertData) {
      var promises = concertData.map(songkickConcert => {
        //check if this concert is in db and add if its not
        var concert = {};
        concert.id = songkickConcert.id;
        concert.name = songkickConcert.displayName;
        concert.url = songkickConcert.uri;
        concert.venue = songkickConcert.venue.displayName;
        concert.location = songkickConcert.location.city;
        concert.artist = songkickConcert.performance[0].displayName;
        concert.artistId = songkickConcert.performance[0].artist.id;
        concert.date = songkickConcert.start.datetime;
      
        return checkConcert(concert.id, concert);
      })

      Promise.all(promises).then(data =>
      {
        console.log('Successfully loaded in mock concerts');
      });
    })
    .catch(function(error) {
      console.log("error loading concert data: " + error);
    });
}

module.exports = {
	User: require('./User')
};