'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.post('/create', userController.create);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/delete/:id', userController.deleteUser);
router.get('/all/delete', userController.deleteAll);
router.get('/getIdFromSpotify/:code', userController.getUserIdBySpotifyCode);

module.exports = router;