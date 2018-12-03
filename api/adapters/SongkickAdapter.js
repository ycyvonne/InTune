"use strict";

/** Server side Songkick adapter providing interface to interact with external songkick API
 * @module adapters/songkick
 * @requires request
 */

/**
 * request module
 * @const
 */
const request = require("request");
const config = require("../config");

/**
 * Get concert from Songkick API
 * @param {*} options 
 * @param {*} cb 
 */
function getFromSongkick(options, cb) {
  request.get(options, function(error, response, body) {
    if (body) {
      cb(body.resultsPage.results.event);
    }
    else {
      console.log('retrying...')
      return getFromSongkick(options, cb);
    }
  });
}

/**
 * Get a list of events by Metro area
 *
 * @name getAccessToken
 * @function
 * @memberof module:adapters/songkick
 * @param {string} metro_area - metro area code
 * @returns {Promise} - A promise which resolves to a JSON object containing a list of events
 */
function getEventsByMetroArea(metro_area) {
  var apiUrl = config.songkick.url.base + config.songkick.key;
  var options = {
    url: apiUrl,
    json: true
  };

  // use the access token to access the Spotify Web API
  return new Promise(function(resolve, reject) {
    getFromSongkick(options, (data) => {
      resolve(data);
    })
  });
}

module.exports = {
  getEventsByMetroArea
};
