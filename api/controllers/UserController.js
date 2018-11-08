'use strict';

const User = require('../models/User'); // eslint-disable-line

function index(req, res) {
	res.json('/ endpoint hit');
}

function getName(req, res) {
	res.json('Joe Bruin');
}

function create(req, res) {
	User.create("Joe Bruin", 10);
	res.json('create here :)');
}

function createFromId(req, res) {
	User.create("Joe Bruin", req.params["id"]);
	res.json('create here :)');
}

function getUsers(req, res) {
	User.find(
		function (err, users) {
			if (err)
				return console.error(err);
			console.log(users);
		}
	)
}

function getUser(req, res) {
	res.json('got :)');
	User.find({id: req.params["id"]});
}

function getFromId(req, res) {
	res.json('got :)');

	User.find(
		{id: req.params["id"]},
		function (err, users) {
			if (err)
				return console.error(err);
			console.log(users);
		}
	);

}

function deleteUser(req, res) {
	res.json('byebye :)');
	User.find( {id: req.params["id"]}).remove().exec();
}

module.exports = {
	index,
	getName,
	create,
	getUsers,
	createFromId,
	getUser,
	getFromId,
	deleteUser
};