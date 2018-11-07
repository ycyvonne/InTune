'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.get('/name', userController.getName);
router.post('/token', userController.getAccessToken);

module.exports = router;