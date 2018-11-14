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

/**
 * Return a user ID from a Spotify access code.
 * @param {*} req
 * @param {*} res
 */
function getUserIdBySpotifyCode(req, res) {
	var code = req.params.code;
	const session = req.cookies.session;

	// Get the user object
	SpotifyAdapter.getAccessToken(code, session)
		.then(tokenInfo => {
			console.log('Got tokens ' + JSON.stringify(tokenInfo));
			res.cookie('session', tokenInfo.session);
			return SpotifyAdapter.getUserInfo(tokenInfo.access_token);
		})
		.then(data => {
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