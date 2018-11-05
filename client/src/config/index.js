const secrets = require('./secrets');

module.exports = (() => {
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
			// Server settings
			server: {
				host: 'localhost',
				port: 8080
			},

			spotify: {
				client_id: secrets.spotify.client_id,
				client_secret: secrets.spotify.client_secret,
				redirect_uri: 'http://localhost:3000/callback'
			},

			songkick: {
				key: secrets.songkick.key
			}
		};
	}
})();