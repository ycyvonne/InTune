'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.post('/create', userController.create);
router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/delete', userController.deleteUser);
router.get('/all/delete', userController.deleteAll);
router.post('/login', userController.login);

module.exports = router;