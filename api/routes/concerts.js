"use strict";

const express = require("express");
let concertRouter = express.Router();

const concertController = require("../controllers/ConcertController");

/**
 * Route to get concert events
 * @name /
 * @function
 * @memberof module:routes/concert~concertRouter
 * @inner
 * @param {string} metro_area - Metro area ID to search by
 * @returns {JSON} - A json object containing a list of concert events
 */
concertRouter.get("/", concertController.getConcerts);

module.exports = concertRouter;
