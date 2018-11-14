'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.get('/create', userController.create);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/delete/:id', userController.deleteUser);
router.get('/all/delete', userController.deleteAll);
router.post('/token', userController.getAccessToken);

module.exports = router;