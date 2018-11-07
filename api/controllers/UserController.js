'use strict';

const User = require('../models/User'); // eslint-disable-line
const request = require('request');
const config = require('../config');

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
	
	var authOptions = {
		method: 'POST',
		url: config.spotify.url.request_token,
		form: {
			code: code,
			redirect_uri: config.spotify.redirect_uri,
			grant_type: 'authorization_code'
		},
		headers: {
			'Authorization': 'Basic ' + (new Buffer(config.spotify.client_id + ':' + config.spotify.client_secret).toString('base64'))
		},
		json: true
	};
	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token,
				refresh_token = body.refresh_token;
	
			var options = {
				url: config.spotify.url.web_api,
				headers: { 'Authorization': 'Bearer ' + access_token },
				json: true
			};
	
			// use the access token to access the Spotify Web API
			request.get(options, function(error, response, body) {
				// TODO: save this user info
				res.json(body);
			});
	
			// TODO: save this access_token and refresh_token

			// var info = Object.assign({}, {
			// 	access_token: access_token,
			// 	refresh_token: refresh_token
			// }, body);
		} else {
			res.json({
				error: 'invalid_token'
			});
		}
	});
}

module.exports = {
	index,
	getName,
	getAccessToken
};