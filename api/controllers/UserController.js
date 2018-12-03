"use strict";

const User = require("../models/User"); // eslint-disable-line
const Concert = require("../models/Concert");
const SpotifyAdapter = require("../adapters/SpotifyAdapter");
const sessions = require("../sessions");
const util = require("../utils");

function index(req, res) {
  res.json("/ endpoint hit");
}

/**
 * Creates a new user and saves it to the DB.
 * @param {*} userData 
 * @param {*} sessionInfo 
 */
function _createUser(userData, sessionInfo) {
  var musicProfile = {};
  var profile = {};
  var spotId;

  return new Promise((resolve, reject) => {
    spotId = userData.id;

    // Update profile
    profile.name = userData.display_name;
    profile.email = userData.email;
    profile.img = userData.images[0].url;
    profile.spotifyUrl = userData.external_urls.spotify;
    profile.isArtist = false;
    resolve(User.create(spotId));
  })
    .then(user => {
      sessionInfo.id = user._id;
      return User.updateProfile(user._id, profile);
    })
    .then(user => {
      return SpotifyAdapter.getUserTopArtists(sessionInfo.access_token);
    })
    .then(artists => {
      musicProfile.artists = artists;
      return SpotifyAdapter.getUserTopTracks(sessionInfo.access_token);
    })
    .then(tracks => {
      musicProfile.tracks = tracks;
      musicProfile.genres = [];

      return User.updateMusicProfile(sessionInfo.id, musicProfile);
    });
}

function getUsers(req, res) {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.send(err));
}

function getArtists(req, res) {
  User.findAll(true)
    .then(users => res.send(JSON.stringify(users)))
    .catch(err => res.send(err));
}

/**
 * Get a user by ID.
 * @param {*} req 
 * @param {*} res 
 */
function getUser(req, res) {
  User.findById(req.params.id)
    .then(user => res.send(getUserReturnString))
    .catch(err => res.send(err));
}

function deleteUser(req, res) {
  User.deleteById(req.body.id)
    .then(user => res.send(JSON.stringify(user)))
    .catch(err => res.send(err));
}

function deleteAll(req, res) {
  User.deleteAll()
    .then(users => res.send(JSON.stringify(users)))
    .catch(err => res.send(err));
}

/**
 * Login/create a user and set the proper cookie.
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res) {
  var code = req.body.code;
  const session = req.cookies.session;

  var info = {};
  var sessionId;

  var userData;

  var isNewUser;

  // Get the user object
  var getUserPromise = SpotifyAdapter.getAccessToken(code, session)
    .then(tokenInfo => {
      info.access_token = tokenInfo.access_token;
      info.refresh_token = tokenInfo.refresh_token;
      sessionId = tokenInfo.session;

      return SpotifyAdapter.getUserInfo(info.access_token);
    })
    .then(data => {
      userData = data;
      return User.findBySpotifyId(data.id);
    })
    .then(user => {
      if (user) {
        isNewUser = false;
        return user;
      } else {
        isNewUser = true;
        return _createUser(userData, info);
      }
    });

  getUserPromise
    .then(user => {
      info.id = user.id;
      sessions.setSessionStateById(sessionId, info);
      res.cookie("session", sessionId);
      console.log("sending... " + user.name);
      console.log("session cookie = " + sessionId);
      res.send(getUserReturnString(user, isNewUser));
    })
    .catch(err => res.send(err));
}

function updateProfile(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }

  User.findById(state.id)
    .then(user => {
      var profile = {
        name: req.body.name,
        email: req.body.email,
        img: req.body.img,
        spotifyUrl: req.body.spotifyUrl,
        isArtist: req.body.isArtist
      };

      return User.updateProfile(user._id, profile);
    })
    .then(newUser => {
      return res.send(getUserReturnString(newUser));
    })
    .catch(err => {
      console.log("error: " + err.message);
      res.send(err);
    });
}

/**
 * Get the info for the currently logged in user.
 * @param {*} req 
 * @param {*} res 
 */
function getMe(req, res) {
  console.log("cookie", req.cookies.session);
  var lookup = sessions.lookupSession(req.cookies.session);
  console.log(lookup);
  if (!req.cookies.session || !lookup) {
    return res.status(401).send("User not logged in.");
  }

  User.findById(lookup.id)
    .then(user => {
      res.send(getUserReturnString(user));
    })
    .catch(err => {
      console.log("error: " + err.message);
      res.send(err);
    });
}

function getTopTracks(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }

  SpotifyAdapter.getUserTopTracks(state.access_token)
    .then(tracks => {
      res.send(tracks);
    })
    .catch(err => res.send(err));
}

function getTopArtists(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }

  SpotifyAdapter.getUserTopArtists(state.access_token)
    .then(artists => {
      res.send(artists);
    })
    .catch(err => res.send(err));
}

/**
 * Get a user's list of potential matches, sorted for similarity.
 * @param {*} req 
 * @param {*} res 
 */
function getMatches(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }
  var user;
  var users = [];
  var artists = [];
  var concerts = [];
  User.findById(state.id)
    .then(_user => {
      user = _user;
      return User.findAll();
    })
    .then(_users => {
      users = _users;
      return User.findAll(true);
    })
    .then(_artists => {
      artists = _artists;
      util.shuffle(artists);
      return Concert.findAll();
    })
    .then(_concerts => {
      concerts = _concerts;
      util.shuffle(concerts);

      var mp = user.musicProfile;

      util.shuffle(users);
      users.sort((a, b) => {
        return util.getScore(user, b) - util.getScore(user, a);
      });

      var matches = [];
      var idx_artist = 0;
      var idx_user = 0;
      var idx_concert = 0;
      while (idx_user < users.length) {
        var data = users[idx_user];
        if (
          String(data._id).valueOf() !== String(user._id).valueOf() &&
          !user.desired.includes(String(data._id).valueOf())
        ) {
          matches.push({
            type: "user",
            id: data._id,
            data: getUserData(data)
          });
        }
        idx_user++;
        if (idx_user % 3 == 0 && idx_artist < artists.length) {
          var data = artists[idx_artist];
          matches.push({
            type: "artist",
            id: data._id,
            data: getUserData(data)
          });
          idx_artist++;
        } else if (
          idx_user != 0 &&
          idx_user % 5 == 0 &&
          idx_concert < concerts.length
        ) {
          var data = concerts[idx_concert];
          matches.push({
            type: "concert",
            id: data.concertId,
            data: getConcertData(data)
          });
          idx_concert++;
        }
      }

      res.send({
        matches: matches
      });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      res.status(500).send("Could not get matches: " + err);
    });
}

function getSpotifyProfile(req, res) {
  var code = req.body.code;

  SpotifyAdapter.getAccessToken(code, req.cookies.session)
    .then(token => {
      var id = token.session;
      res.cookie("session", id);
      return SpotifyAdapter.getUserInfo(token.access_token);
    })
    .then(userData => {
      res.send(userData);
    })
    .catch(err => {
      console.log("we got some kind of error " + err.message);
      res.status(500).send(err);
    });
}

/**
 * Match the logged in user to another user.
 * @param {*} req 
 * @param {*} res 
 */
function match(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }

  var otherId = req.body.id;
  if (!otherId) {
    console.log("bad other id " + otherId);
    return res.status(400).send("'otherId' field not supplied in request.");
  }

  console.log("got id " + otherId);

  var matcher;

  console.log("trying to match users");

  User.match(state.id, otherId)
    .then(newUser => {
      matcher = newUser;
      return User.hasMatch(matcher._id, otherId);
    })
    .then(isMatch => {
      res.send({
        isMatch: isMatch,
        data: getUserData(matcher)
      });
    })
    .catch(err => {
      console.log("got error: " + err.message);
      res.status(500).send("error: " + err);
    });
}

/**
 * Get the logged in user's matches.
 * @param {*} req 
 * @param {*} res 
 */
function getPeople(req, res) {
  var state = sessions.lookupSession(req.cookies.session);
  if (!state) {
    return res.status(401).send("User not logged in.");
  }
  console.log("getPeople");
  console.log(req);
  console.log(res);
  User.findById(state.id)
    .then(user => {
      return Promise.all(
        user.matches.map(id => {
          return User.findById(id);
        })
      );
    })
    .then(users => {
      res.json(users.map(user => getUserData(user)));
    })
    .catch(err => {
      console.log(err, err.message);
      res.status(500).send(err);
    });
}

function matchConcert(req, res) {
    var state = sessions.lookupSession(req.cookies.session);
    if (!state) {
      return res.status(401).send("User not logged in.");
    }

    var cid = req.body.id;
    if (!cid) {
        console.log("bad other id " + cid);
        return res.status(400).send("'id' field for concert id not supplied in request.");
    }

    Concert.findByConcertId(cid)
        .then(concert => {
            if (!concert) {
                return new Promise((resolve, reject) => reject("Concert with id " + cid + " does not exist."));
            }
            return User.findById(state.id);
        })
        .then(user => {
            return User.addConcert(user._id, cid);
        })
        .then(user => {
            return res.json({
                isMatch: true,
                id: user._id,
                data: getUserData(user)
            });
        })
        .catch(err => {
            console.log(err, err.message);
            res.status(500).send(err);
        })
}

function getConcerts(req, res) {
    var state = sessions.lookupSession(req.cookies.session);
    if (!state) {
        return res.status(401).send("User not logged in.");
    }

    User.findById(state.id)
        .then(user => {
            return Promise.all(user.concerts.map(id => {
                return Concert.findByConcertId(id);
            }))
        })
        .then(concerts => {
            res.json(concerts.map(concert => getConcertData(concert)));
        })
        .catch(err => {
            console.log(err, err.message);
            res.status(500).send(err);
        });
}

function testMatches(req, res) {
  var first, second, result;
  result = {};

  console.log("testing matches");

  User.findBySpotifyId(1)
    .then(user => {
      first = user;
      return User.findBySpotifyId(2);
    })
    .then(user => {
      second = user;

      return User.match(first._id, second._id);
    })
    .then(_ => {
      return User.match(second._id, first._id);
    })
    .then(_ => {
      return User.findById(first._id);
    })
    .then(user => {
      result.first = user;
      return User.findById(second._id);
    })
    .then(user => {
      result.second = user;
      return User.hasMatch(first._id, second._id);
    })
    .then(isMatch => {
      result.isMatch = isMatch;
      res.json(result);
    })
    .catch(err => {
      console.log(err, err.message);
      res.status(500).send(err);
    });
}

/**
 * Get the needed fields from the user object.
 * @param {*} user 
 */
function getUserData(user) {
  return {
    id: user._id,
    name: user.name,
    img: user.img,
    spotifyUrl: user.spotifyUrl,
    email: user.email,
    isArtist: user.isArtist,
    matches: user.matches,
    artists: user.artists,
    tracks: user.tracks,
    concerts: user.concerts
  };
}

function getConcertData(concert) {
    if (!concert) {
        return null;
    }
    return {
        id: concert.concertId,
        name: concert.name,
        url: concert.songkickUrl,
        venue: concert.venue,
        location: concert.location,
        artist: concert.artist,
        artist_id: concert.artistId,
        date: concert.date,
        data: concert.data
    };
}

const mockConcerts = require('../mock-concert')
function getUserConcerts(req, res) {
  console.log('mock concerts', mockConcerts.concerts[0])
  res.send(mockConcerts.concerts);
}

/**
 * Get user return string to send back to client.
 * @param {*} user 
 * @param {*} isNewUser 
 */
function getUserReturnString(user, isNewUser = false) {
  var data = getUserData(user);
  data.isNewUser = isNewUser;

  return JSON.stringify(data);
}

module.exports = {
  index,
  getUsers,
  getArtists,
  getUser,
  deleteUser,
  deleteAll,
  login,
  updateProfile,
  getMe,
  getTopTracks,
  getTopArtists,
  getMatches,
  getSpotifyProfile,
  match,
  getPeople,
  matchConcert,
  getConcerts,
  getUserConcerts,
  testMatches
};

//   // stub getting matches
//   var profiles = [];

//   for (var i = 0; i < 10; i++) {
//     profiles.push({
//       sid: i.toString(),
//       profile: {
//         name: "John Smith " + i.toString(),
//         img: "https://robertzalog.com/me.jpg",
//         email: "jsmith@gmail.com",
//         spotifyUrl: "https://robertzalog.com",
//         isArtist: false
//       },
//       music_profile: {
//         artists: [],
//         genres: [],
//         tracks: []
//       }
//     });
//   }
//   var matches = [];
//   profiles.forEach((profile, i) => {
//     var type = "user";
//     if (i % 5 == 0) {
//       type = "artist";
//     } else {
//       type = "concert";
//     }
//     matches.push({
//       type: type,
//       id: "" + Math.random(),
//       data: profile
//     });
//   });

//   res.send({
//     matches: matches
//   });
