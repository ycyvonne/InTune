"use strict";

/** Server side Express router providing user related routes
 * @module routes/user
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 */
let router = express.Router();

const userController = require("../controllers/UserController");

/**
 * Route serving root index
 * @name /
 * @function
 * @memberof module:routes/user~userRouter
 */
router.get("/", userController.index);

// /**
//  * Route for user creation
//  * @name /create
//  * @function
//  * @memberof module:routes/user~userRouter
//  * @inner
//  * @param {string} req.body.code - Code provided to generate access token
//  * @returns {JSON} - A json object containing user info
//  */
// router.post('/create', userController.create);

/**
 * Route to get all normal users
 * @name /all
 * @function
 * @memberof module:routes/user~userRouter
 * @returns {JSON} - A json object containing an array of users
 */
router.get("/all", userController.getUsers);

/**
 * Route to get all artists
 * @name /artists
 * @function
 * @memberof module:routes/user~userRouter
 * @returns {JSON} - A json object containing an array of users
 */
router.get("/artists", userController.getArtists);

/**
 * Route for user deletion
 * @name /delete
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.id - user specific id
 * @returns {JSON} - A json object containing deleted user
 */
router.post("/delete", userController.deleteUser);

/**
 * Route for all user deletion
 * @name /all/delete
 * @function
 * @memberof module:routes/user~userRouter
 * @returns {JSON} - A json object containing an array of deleted users
 */
router.get("/all/delete", userController.deleteAll);

/**
 * Route for user login
 * @name /login
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.code - Code provided to generate access token
 * @param {string} req.body.session - The client session ID
 * @returns {string} - A string with success code 'User successfully logged in.'
 */
router.post("/login", userController.login);

/**
 * Route to get user info
 * @name /me
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing the user info
 */
router.get("/me", userController.getMe);

/**
 * Route to get user info
 * @name /me/update
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {*} req.body.profile - The new profile information
 * @returns {JSON} - A json object containing the user info
 */
router.post("/me/update", userController.updateProfile);

/**
 * Route to match request another user
 * @name /me/match
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.id - The id of the other user to match with.
 * @returns {JSON} - A json object containing the user info
 */
router.post("/me/match", userController.match);

/**
 * Route to get all matched users
 * @name /me
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @returns {JSON} - A json object containing the user info
 */
router.get("/me/people", userController.getPeople);

router.get("/test-matches", userController.testMatches);

/**
 * Route to get user's top-tracks
 * @name /me/top-tracks
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing a list of a user's top tracks
 */
router.get("/me/top-tracks", userController.getTopTracks);

/**
 * Route to get user's top-artists
 * @name /me/top-artists
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing a list of a user's top artists
 */
router.get("/me/top-artists", userController.getTopArtists);

/**
 * Route to get matches for this user
 * @name /me/matches
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @returns {JSON} - A json object containing a list of matches sorted by similarity
 */
router.get("/me/matches", userController.getMatches);

/**
 * Concert matching
 */
router.get("/me/concerts", userController.getConcerts);

/**
 * Route to get a specific user's Spotify profile
 * @name /me/match-concert
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.id - The id of the concert ot match with
 * @returns {JSON} - A json object containing the current user's info
 */
router.post("/me/match-concert", userController.matchConcert);

/**
 * Route to get a specific user's Spotify profile
 * @name /get-spotify-profile
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.code - The Spotify code of the user's profile to get
 * @returns {JSON} - A json object containing a queried user's info
 */
router.post("/get-spotify-profile", userController.getSpotifyProfile);

/**
 * Route to get a specific user
 * @name /:id
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.params.id - The ID of the user to get
 * @returns {JSON} - A json object containing a queried user's info
 */
router.get("/:id", userController.getUser);

module.exports = router;
