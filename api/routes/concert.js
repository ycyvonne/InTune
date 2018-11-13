'use strict';

const express = require('express');
let concertRouter = express.Router();

const concertController = require('../controllers/ConcertController');

concertRouter.get('/', concertController.getConcerts);

module.exports = concertRouter;