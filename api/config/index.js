'use strict';

const secrets = require('./secrets');

module.exports = (() => {
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
			// MongoDB connection settings
			database: {
				uri: 'mongodb://db_mongo'
			},

			// Server settings
			server: {
				host: 'localhost',
				port: 8080
			},

			spotify: {
				client_id: secrets.spotify.client_id,
				client_secret: secrets.spotify.client_secret,
				redirect_uri: 'http://localhost:3000/callback',
				url: {
					request_token: 'https://accounts.spotify.com/api/token',
					web_api: 'https://api.spotify.com/v1/me'
				}
			},

			songkick: {
				// hardcode for LA metro area (id: 17835)
				url: {
					base: 'https://api.songkick.com/api/3.0/events.json?location=sk:17835&apikey=' 
				},
				key: secrets.songkick.key
			}
		};
	}
})();