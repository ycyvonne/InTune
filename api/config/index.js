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

			soundcloud: {
				client_id: secrets.soundcloud.client_id,
				client_secret: secrets.soundcloud.client_secret,
				redirect_uri: 'http://localhost:8888/callback'
			},

			songkick: {
				key: secrets.songkick.key
			}
		};
	}
})();