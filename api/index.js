'use strict';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

app.use(cors({
	credentials: true,
	origin: true
}));

app.use(bodyParser.json())

// Connect to database
require('./models');

// Set up router endpoints
const userRouter = require('./routes/user');
app.use('/user', userRouter);

server.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port);
});
