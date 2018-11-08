'use strict';

const User = require('../models/User'); // eslint-disable-line
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

function index(req, res) {
	res.json('/ endpoint hit');
}

function getName(req, res) {
	res.json('Joe Bruin');
}

// calls 2 spotify endpoints
// POST to /api/token for access token
// GET from spotify web api /v1/me for user info
function getAccessToken(req, res) {
	var code = req.body.code;
	var returnTokenPromise;

	const sessionId = req.cookies.session;
	if (sessionId) {
		returnTokenPromise = new Promise(function(resolve, reject) {
			var lookup = lookupSession(sessionId);
			return lookup.access_token;
		});
	}
	else {
		returnTokenPromise = SpotifyAdapter
			.getAccessToken(code)
			.then(function(tokens) {
				const id = sessions.generateID();
				sessions.setTokens(id, tokens);
				res.cookie('session', id);
				return tokens.access_token;
			});
	}

	returnTokenPromise
		.then(SpotifyAdapter.getUserInfo)
		.then(function(spotifyData) {
			res.json(spotifyData);
		})
		.catch(function(error) {
			res.json({'error': error})
		});
}

module.exports = {
	index,
	getName,
	getAccessToken
};