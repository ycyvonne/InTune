'use strict';

const mongoose = require('mongoose');

// User Schema Definition
var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: String,
	spotifyRefreshToken: String,
	name: String,

});

// User Schema Methods

/**
 * Creates and saves a User object in the database
 * @param {string} user's name
 * @returns {User} newly saved User object
 * @example
 * User.create("Joe Bruin")
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.create = function(name) {
	var user = new this({
		_id: mongoose.Types.ObjectId(),
		name: name
	});

	return new Promise((resolve, reject) => {
		user.save((error, newUser) => {
			if (error) reject(error);
			else resolve(newUser);
		});
	});
};

/**
 * Gets a single User object in the database
 * @param {string} User id
 * @returns {User} User object
 * @example
 * User.findById(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findById = function(id) {
	return new Promise((resolve, reject) => {
		this.find({_id: id}, (error, user) => {
			if (error) reject(error);
			else resolve(user[0]);
		});
	});
};

/**
 * Gets all User objects in the database
 * @returns {[User]} User objects
 * @example
 * User.findAll(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.findAll = function() {
	return new Promise((resolve, reject) => {
		this.find({}, (error, users) => {
			if (error) reject(error);
			else resolve(users);
		});
	});
};

/**
 * Deletes a single User object in the database
 * @param {string} User id
 * @example
 * User.deleteById(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.deleteById = function(id) {
	return new Promise((resolve, reject) => {
		this.remove({_id: id}, (error, user) => {
			if (error) reject(error);
			else resolve(user);
		});
	});
};

/**
 * Deletes all users from the database
 * @example
 * User.deleteById(... id ...)
 *     .then(user => console.log(user))
 *     .catch(error => console.error(error));
 */
userSchema.statics.deleteAll = function() {
	return new Promise((resolve, reject) => {
		this.remove({}, (error, users) => {
			if (error) reject(error);
			else resolve(users);
		});
	});
}

module.exports = mongoose.model('User', userSchema);