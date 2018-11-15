'use strict';

/** Express router providing user related routes
 * @module routes/user
 * @requires express
 */

 /**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 */
let router = express.Router();

const userController = require('../controllers/UserController');

/**
 * Route serving root index
 * @name /user
 * @function
 * @memberof module:routes/user~userRouter
 */
router.get('/', userController.index);

/**
 * Route for user creation
 * @name /user/create
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.code - Code provided to generate access token
 * @returns {JSON} - A json object containing user info
 */
router.post('/create', userController.create);

/**
 * Route to get all users
 * @name /user/all
 * @function
 * @memberof module:routes/user~userRouter
 * @returns {JSON} - A json object containing an array of users
 */
router.get('/all', userController.getUsers);

/**
 * Route for user deletion
 * @name /user/delete
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.id - user specific id 
 * @returns {JSON} - A json object containing deleted user
 */
router.post('/delete', userController.deleteUser);

/**
 * Route for all user deletion
 * @name /user/all/delete
 * @function
 * @memberof module:routes/user~userRouter
 * @returns {JSON} - A json object containing an array of deleted users
 */
router.get('/all/delete', userController.deleteAll);

/**
 * Route for user login
 * @name /user/login
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.code - Code provided to generate access token
 * @param {string} req.body.session - The client session ID
 * @returns {string} - A string with success code 'User successfully logged in.'
 */
router.post('/login', userController.login);

/**
 * Route to get user info
 * @name /user/me
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing the user info
 */
router.get('/me', userController.getMe);

/**
 * Route to get user's top-tracks
 * @name /user/me/top-tracks
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing a list of a user's top tracks
 */
router.get('/me/top-tracks', userController.getTopTracks);

/**
 * Route to get user's top-artists
 * @name /user/me/top-artists
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.body.session - The client session ID
 * @returns {JSON} - A json object containing a list of a user's top artists
 */
router.get('/me/top-artists', userController.getTopArtists);

/**
 * Route to get matches for this user
 * @name /user/me/matches
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @returns {JSON} - A json object containing a list of matches sorted by similarity
 */
router.get('/me/matches', userController.getMatches);

/**
 * Route to get a specific user
 * @name /user/:id
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} req.params.id - The ID of the user to get
 * @returns {JSON} - A json object containing a queried user's info
 */
router.get('/:id', userController.getUser);


module.exports = router;