"use strict";

const express = require("express");
let concertRouter = express.Router();

const concertController = require("../controllers/ConcertController");

// ** NOTE: Exposed route to controller's getConcerts **
concertRouter.get("/", concertController.getConcerts);

module.exports = concertRouter;
