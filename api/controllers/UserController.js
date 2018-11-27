'use strict';

const User = require('../models/User'); // eslint-disable-line
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const sessions = require('../sessions');

function index(req, res) {
	res.json('/ endpoint hit');
}

function _createUser(userData, sessionInfo) {

	var musicProfile = {};
	var profile = {};
	var spotId;

	return new Promise((resolve, reject) => {
		spotId = userData.id;

		// Update profile
		profile.name = userData.display_name;
		profile.email = userData.email;
		profile.img = userData.images[0].url;
		profile.spotifyUrl = userData.external_urls.spotify;
		resolve(User.create(spotId));
	})
	.then(user => {
		sessionInfo.id = user._id;
		return User.updateProfile(user._id, profile);
	})
	.then(user => {
		return SpotifyAdapter.getUserTopArtists(sessionInfo.access_token);
	})
	.then(artists => {
		musicProfile.artists = artists;
		return SpotifyAdapter.getUserTopTracks(sessionInfo.access_token);
	})
	.then(tracks => {
		musicProfile.tracks = tracks;
		musicProfile.genres = [];

		return User.updateMusicProfile(sessionInfo.id, musicProfile);
	});
}

function getUsers(req, res) {
	User.findAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

function getUser(req, res) {
	User.findById(req.params.id)
		.then(user => res.send(getUserReturnString))
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

	var userData;

	var isNewUser;

	// Get the user object
	var getUserPromise = SpotifyAdapter.getAccessToken(code, session)
		.then(tokenInfo => {
			info.access_token = tokenInfo.access_token;
			info.refresh_token = tokenInfo.refresh_token;
			sessionId = tokenInfo.session;

			return SpotifyAdapter.getUserInfo(info.access_token);
		})
		.then(data => {
			userData = data;
			return User.findBySpotifyId(data.id);
		})
		.then(user => {
			if (user) {
				isNewUser = false;
				return user;
			}
			else {
				isNewUser = true;
				return _createUser(userData, info);
			}
		});
	
	getUserPromise
		.then((user) => {
			info.id = user.id;
			sessions.setSessionStateById(sessionId, info);
			res.cookie('session', sessionId);
			console.log('sending...', getUserReturnString(user, isNewUser));
			console.log('session cookie = ' + sessionId);
			res.send(getUserReturnString(user, isNewUser));
		})
		.catch(err => res.send(err));
		
}

function updateProfile(req, res) {
	var state = sessions.lookupSession(req.cookies.session);
	if (!state) {
		return res.status(401).send('User not logged in.');
	}

	User.findById(state.id)
		.then(user => {
			var profile = {
				name: req.body.name,
				email: req.body.email,
				img: req.body.img,
				spotifyUrl: req.body.spotifyUrl,
				isArtist: req.body.isArtist
			}

			return User.updateProfile(user._id, profile);
		})
		.then(newUser => {
			return res.send(getUserReturnString(newUser));
		})
		.catch(err => {
			console.log("error: " + err.message);
			res.send(err)
		});
}

function getMe(req, res) {
	var lookup = sessions.lookupSession(req.cookies.session);
	if (!req.cookies.session || !lookup) {
		return res.status(401).send('User not logged in.');
	}

	User.findById(lookup.id)
		.then(user => {
			res.send(getUserReturnString(user));
		})
		.catch(err => {
			console.log("error: " + err.message);
			res.send(err)
		});
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

function getUserReturnString(user, isNewUser=false) {
	return JSON.stringify({
		id: user._id,
		name: user.name,
		img: user.img,
		spotifyUrl: user.spotifyUrl,
		email: user.email,
		isArtist: user.isArtist,
		isNewUser: isNewUser
	});
}

module.exports = {
	index,
	getUsers,
	getUser,
	deleteUser,
	deleteAll,
	login,
	updateProfile,
	getMe,
	getTopTracks,
	getTopArtists,
	getMatches,
	getSpotifyProfile
};