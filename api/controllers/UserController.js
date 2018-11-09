'use strict';

const User = require('../models/User'); // eslint-disable-line

function index(req, res) {
	res.json('/ endpoint hit');
}

function create(req, res) {
	User.create("Joe Bruin")
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function getUsers(req, res) {
	User.findAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

function getUser(req, res) {
	User.findById(req.params.id)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function deleteUser(req, res) {
	User.deleteById(req.params.id)
		.then(user => res.send(JSON.stringify(user)))
		.catch(err => res.send(err));
}

function deleteAll(req, res) {
	User.deleteAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => res.send(err));
}

module.exports = {
	index,
	create,
	getUsers,
	getUser,
	deleteUser,
	deleteAll
};