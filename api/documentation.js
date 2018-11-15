/** Express router providing user related routes
 * @module routers/users
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
const router = express.Router();

const userController = require('./controllers/UserController');

router.get('/', userController.index);
router.post('/create', userController.create);
router.get('/all', userController.getUsers);
router.post('/delete', userController.deleteUser);
router.get('/all/delete', userController.deleteAll);
router.post('/login', userController.login);
router.get('/me', userController.getMe);
router.get('/me/top-tracks', userController.getTopTracks);
router.get('/me/top-artists', userController.getTopArtists);
router.get('/:id', userController.getUser);