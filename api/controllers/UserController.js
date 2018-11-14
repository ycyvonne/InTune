'use strict';

const User = require('../models/User'); // eslint-disable-line
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

function index(req, res) {
	res.json('/ endpoint hit');
}

function create(req, res) {
	// TODO
	var code = req.body.code;

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
	User.deleteById(req.body.id)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function deleteAll(req, res) {
	User.deleteAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

function login(req, res) {
	var code = req.body.code;
	const session = req.cookies.session;

	var info = {}
	var sessionId;

	// Get the user object
	SpotifyAdapter.getAccessToken(code, session)
		.then(tokenInfo => {
			console.log('Got tokens ' + JSON.stringify(tokenInfo));

			info.access_token = tokenInfo.access_token;
			info.refresh_token = tokenInfo.refresh_token;
			sessionId = tokenInfo.sessionId;

			return SpotifyAdapter.getUserInfo(info.access_token);
		})
		.then(data => {
			info.id = data.id;
			console.log("Cookies set to " + JSON.stringify(info));
			sessions.setSessionStateById(sessionId, info);
			return User.findBySpotifyId(data.id);
		})
		.then(user => res.status(200).send('User successfully logged in.'))
		.catch(err => res.send(err));
}

function getTopTracks(req, res) {
	SpotifyAdapter.getAccessToken(null, req.cookies.session)
		.then(token => {
			return SpotifyAdapter.getUserTopTracks(token.access_token);
		})
		.then(data => {
			res.send(data);
		})
}

module.exports = {
	index,
	create,
	getUsers,
	getUser,
	deleteUser,
	deleteAll,
	login,
	getTopTracks
};