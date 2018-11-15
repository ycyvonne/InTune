'use strict';

const User = require('../models/User'); // eslint-disable-line
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const SongkickAdapter = require('../adapters/SongkickAdapter');
const sessions = require('../sessions');

function index(req, res) {
	res.json('/ endpoint hit');
}

function create(req, res) {
	// TODO
	var code = req.body.code;

	// need to check for duplicates

	var sessionInfo = {};
	var sessionId;
	var profile = {};
	var spotId;
	SpotifyAdapter.getAccessToken(code)
		.then(token => {
			sessionInfo.access_token = token.access_token;
			sessionInfo.refresh_token = token.refresh_token;
			sessionId = token.session;
			return SpotifyAdapter.getUserInfo(sessionInfo.access_token);
		})
		.then(userData => {
			spotId = userData.id;
			return User.findBySpotifyId(userData.id);
		})
		.then(possUser => {
			if (possUser != null) {
				return res.status(403).send('Error: User already exists');
			}
			return User.create(spotId);
		})
		.then(user => {
			sessionInfo.id = user._id;
			return SpotifyAdapter.getUserTopArtists(sessionInfo.access_token);
		})
		.then(artists => {
			profile.artists = artists;
			return SpotifyAdapter.getUserTopTracks(sessionInfo.access_token);
		})
		.then(tracks => {
			profile.tracks = tracks;
			profile.genres = [];

			return User.updateMusicProfile(sessionInfo.id, profile);
		})
		.then(user => {
			sessions.setSessionStateById(sessionId, sessionInfo);
			res.cookie('session', sessionId);
			res.send(JSON.stringify(user));
		})
		.catch(err => {
			console.log("we got some kind of error " + err.message);
			res.status(500).send(err)
		});
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
			info.access_token = tokenInfo.access_token;
			info.refresh_token = tokenInfo.refresh_token;
			sessionId = tokenInfo.session;

			return SpotifyAdapter.getUserInfo(info.access_token);
		})
		.then(data => {
			return User.findBySpotifyId(data.id);
		})
		.then(user => {
			info.id = user.id;
			sessions.setSessionStateById(sessionId, info);
			res.cookie('session', sessionId);
			res.send('User successfully logged in.');
		})
		.catch(err => res.send(err));
}

function getMe(req, res) {
	var lookup = sessions.lookupSession(req.cookies.session);
	if (!req.cookies.session || !lookup) {
		return res.status(401).send('User not logged in.');
	}

	User.findById(lookup.id)
		.then(user => {
			res.send(JSON.stringify(user));
		})
		.catch(err => res.send(err));
}

function getTopTracks(req, res) {
	var state = sessions.lookupSession(req.cookies.session);
	if (!state) {
		return res.status(401).send('User not logged in.');
	}

	SpotifyAdapter.getUserTopTracks(state.access_token)
		.then(tracks => {
			res.send(tracks);
		})
		.catch(err => res.send(err));
}

function getTopArtists(req, res) {
	var state = sessions.lookupSession(req.cookies.session);
	if (!state) {
		return res.status(401).send('User not logged in.');
	}

	SpotifyAdapter.getUserTopArtists(state.access_token)
		.then(artists => {
			res.send(artists);
		})
		.catch(err => res.send(err));
}

function getMatches(req, res) {
	var state = sessions.lookupSession(req.cookies.session);
	if (!state) {
		return res.status(401).send('User not logged in.');
	}

	var matches = [];
	var user;
	User.findById(state.id)
		.then(_user => {
			user = _user;
			return User.findAll();
		})
		.then(users => {
			var mp = user.musicProfile;
			users.sort((a, b) => {
				return getScore(mp, b) - getScore(mp, a);
			});

			var userIds = [];
			users.forEach(value => {
				if (String(value._id).valueOf() !== String(user._id).valueOf()) userIds.push(value._id);
			})
			res.send(userIds);
		})
}

function getSpotifyProfile(req, res) {
	var code = req.body.code;

	SpotifyAdapter.getAccessToken(code, req.cookies.session)
		.then(token => {
			var id = token.session;
			res.cookie('session', id);
			return SpotifyAdapter.getUserInfo(token.access_token);
		})
		.then(userData => {
			res.send(userData);
		})
		.catch(err => {
			console.log("we got some kind of error " + err.message);
			res.status(500).send(err)
		});
}

module.exports = {
	index,
	create,
	getUsers,
	getUser,
	deleteUser,
	deleteAll,
	login,
	getMe,
	getTopTracks,
	getTopArtists,
	getMatches,
	getSpotifyProfile
};