'use strict';

const request = require('request');
const config = require('../config');
const sessions = require('../sessions');

function getAccessToken(code, session) {
    var lookup = sessions.lookupSession(session);
    if (session && lookup && lookup.access_token && lookup.refresh_token) {
        // Check the cache first
        return new Promise((resolve, reject) => {
                resolve({
                    access_token: lookup.access_token,
                    refresh_token: lookup.refresh_token,
                    session: session
                });
        });
    }
    else {
        // Get new token, update cache
        var authOptions = {
            method: 'POST',
            url: config.spotify.url.request_token,
            form: {
                code: code,
                redirect_uri: config.spotify.redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(config.spotify.client_id + ':' + config.spotify.client_secret).toString('base64'))
            },
            json: true
        };
        
        return new Promise(function(resolve, reject) {
            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
                    
                    // Update cache
                    const id = sessions.generateID();
                    sessions.setSessionStateById(id, {access_token: access_token, refresh_token: refresh_token});

                    console.log('Created id ' + id);
                    resolve({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        session: id
                    });
                }
                else {
                    reject(new Error('could not fetch access token with code=' + response.statusCode + ', body=' + JSON.stringify(response)));
                }
            });
        });
    }
}

function getUserInfo(access_token) {
    var options = {
        url: config.spotify.url.web_api,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    // use the access token to access the Spotify Web API
    return new Promise(function(resolve, reject) {
        request.get(options, function(error, response, body) {
            resolve(body);
        });
    });
}

module.exports = {
    getAccessToken,
    getUserInfo
};