'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.index);
router.get('/name', userController.getName);
router.get('/create', userController.create);
router.get('/create/:id', userController.createFromId);
router.get('/:id', userController.getUser)
router.get('/get/:id', userController.getFromId);
router.get('/delete/:id', userController.deleteUser)

module.exports = router;