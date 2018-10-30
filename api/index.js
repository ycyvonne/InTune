'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

app.use(cors({
    credentials: true,
    origin: true
}));

const config = require('./config');

// Connect to database
require('./models');

// Set up router endpoints
// const userRouter = require('./routes/user');
// app.use('/user', userRouter);

const utils = require('./utils')
var stateKey = 'spotify_auth_state';

app.get('/', function(req, res) {
    res.send('hello world!');
});

app.get('/login', function (req, res) {

	var state = utils.generateRandomString(16);
	res.cookie(stateKey, state);

	// your application requests authorization
	var scope = 'user-read-private user-read-email playlist-read-private user-read-recently-played';
	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
		response_type: 'code',
		client_id: config.spotify.client_id,
		scope: scope,
		redirect_uri: config.spotify.redirect_uri,
		state: state
	}));
});

server.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port);
});
