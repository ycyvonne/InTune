'use strict';

const mongoose = require('mongoose');

var concertSchema = new mongoose.Schema({
	concertId: String,
	artistId: String,
	// public
	name: String,
    songkickUrl: String,
    venue: String,
    location: String,
    artist: String,
	date: Date,
	data: String
});

concertSchema.statics.create = function(id, concert) {
    var concert  = new this ({
		concertId: id,
		artistId: concert.artistId,
        name: concert.name,
        songkickUrl: concert.url,
        venue: concert.venue,
        location: concert.location,
        artist: concert.artist,
		date: concert.date,
		data: concert.data
    })

    return new Promise((resolve, reject) => {
        concert.save((err, newConcert) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(newConcert);
			}
		})
	})
}

concertSchema.statics.findByConcertId = function(id) {
    return new Promise((resolve, reject) => {
		this.find({concertId: id}, (error, concert) => {
			if (error) reject(error);
			else {
				if (concert.length >= 1) {
					resolve(concert[0]);
				}
				else {
					resolve(null);
				}
			}
		})
	})
}

concertSchema.statics.findAll= function() {
    return new Promise((resolve, reject) => {
		this.find({}, (error, concerts) => {
			if (error) reject(error);
			else {
				resolve(concerts);
			}
		})
	})
}

concertSchema.statics.deleteByConcertId = function(id) {
    return new Promise((resolve, reject) => {
		this.remove({concertId: id}, (error, concert) => {
			if (error) reject(error);
			else resolve(concert);
		});
	});
}

concertSchema.statics.deleteAll = function() {
    return new Promise((resolve, reject) => {
        this.remove({}, (error, concerts) => {
            if (error) reject(error);
            else resolve(concerts);
        });
    });
}

module.exports = mongoose.model('Concert', concertSchema);