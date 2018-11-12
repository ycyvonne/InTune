'use strict';

const request = require('request');
const config = require('../config');

function getEventsByMetroArea(metro_area) {
    var apiUrl = config.songkick.url.base + config.songkick.key;
    var options = {
        url: apiUrl,
        json: true
    };

    // use the access token to access the Spotify Web API
    return new Promise(function(resolve, reject) {
        request.get(options, function(error, response, body) {
            console.log(apiUrl);
            resolve(body);
        });
    });
}

module.exports = {
    getEventsByMetroArea
};