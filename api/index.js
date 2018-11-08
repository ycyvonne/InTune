'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const sessions = require('./sessions');

app.use(cors({
	credentials: true,
	origin: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

/**
 * check if the 'session' cookie is set. if so,
 * set the user state on the request. otherwise
 * return an error. this function is called 'middleware',
 * i.e. it is run before accessing a particular route
 * to ensure the session cookie is set before continuing
 */
const protectedRoute = ((req, res, next) => {
	const session = res.cookie('session');
	if (session) {
	  req.user = sessions.lookupSession(sessionId);
	}
	if (!session || !req.user) {
	  return next(new Error('Unauthorized'));
	}
	next();
});
  

// app.use(cookieParser('this-is-a-secret-token'));
// app.use(session());
// app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

// Connect to database
require('./models');

// Set up router endpoints
const userRouter = require('./routes/user');
app.use('/user', userRouter);

server.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port);
});
