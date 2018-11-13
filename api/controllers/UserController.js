'use strict';

const User = require('../models/User'); // eslint-disable-line
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

function index(req, res) {
	res.json('/ endpoint hit');
}

function create(req, res) {
	// TODO
	console.log(JSON.stringify(req.body));
	var code = req.body.code;
	console.log("got code " + code);

	// need to check for duplicates

	User.create(code)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function getUsers(req, res) {
	User.findAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

function getUser(req, res) {
	User.findById(req.params.id)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function deleteUser(req, res) {
	User.deleteById(req.params.id)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function deleteAll(req, res) {
	User.deleteAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

/**
 * Return a user ID from a Spotify access code.
 * @param {*} req
 * @param {*} res
 */
function getUserIdBySpotifyCode(req, res) {
	var code = req.params.code;
	var tokenPromise;
	const sessionId = req.cookies.session;

	// Check cookies for the access token
	if (sessionId) {
		tokenPromise = new Promise((resolve, reject) => {
			var lookup = sessions.lookupSession(sessionId);
			if (!lookup || !lookup.access_token) {
				reject('no corresponding access token found');
			}
			resolve(lookup.access_token);
		});
	}
	else {
		console.log('Resolving access token with code ' + code);
		tokenPromise = SpotifyAdapter
			.getAccessToken(code)
			.then(token => {
				const id = sessions.generateID();
				sessions.setSessionStateById(id, token);
				res.cookie('session', id);
				return token.access_token;
			});
	}

	// Get the user object
	tokenPromise.then(SpotifyAdapter.getUserInfo)
		.then(data => {
			console.log('user info: ' + JSON.stringify(data));
			var sid = data.id;
			return User.findBySpotifyId(sid);
		})
		.then(user => res.send({id: user._id}))
		.catch(err => res.send(err));
}

module.exports = {
	index,
	create,
	getUsers,
	getUser,
	deleteUser,
	deleteAll,
	getUserIdBySpotifyCode
};