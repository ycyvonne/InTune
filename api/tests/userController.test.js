const User = require("../models/User"); // eslint-disable-line
const Concert = require("../models/Concert");
const SpotifyAdapter = require("../adapters/SpotifyAdapter");
const userController = require("../controllers/UserController");
const sessions = require("../sessions");
const util = require("../utils");

jest.mock('../sessions');
jest.mock('../adapters/SpotifyAdapter');

var mocks = require('node-mocks-http');

var testUser = {
    _id : '123' ,
    name: 'user',
    img: 'img',
    spotifyUrl: 'url',
    email: 'email',
    isArtist: 'artist',
    matches: [],
    artists: [],
    tracks: [],
    genres: [] ,
    desired: '00' 
}

var testSpotifyUser = {
    _id : '123' ,
    name: 'user',
    images: ['img'],
    spotifyUrl: 'url',
    email: 'email',
    isArtist: 'artist',
    matches: [],
    artists: [],
    tracks: [] ,
    external_urls: {
        spotify: 'spotify'
    }    
}

var testUserDataTransformed = {
    id : '123' ,
    name: 'user',
    img: 'img',
    spotifyUrl: 'url',
    email: 'email',
    isArtist: 'artist',
    matches: [],
    artists: [],
    tracks: []  
}

var testUserDataTransformedNewUser = {
    id : '123' ,
    name: 'user',
    img: 'img',
    spotifyUrl: 'url',
    email: 'email',
    isArtist: 'artist',
    isNewUser: false,
    matches: [],
    artists: [],
    tracks: [] ,
}

var testUserMatches = [
   {    _id : '123' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [],
   genres: []    } ,
   {    _id : '124' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [] ,
   genres: []   },
   {    _id : '125' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [] ,    genres: []   },
   {    _id : '126' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [],    genres: []    },
   {    _id : '127' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [],     genres: []    },
   {    _id : '128' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [] ,     genres: []   },
   {    _id : '129' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [],     genres: []    },
   {    _id : '130' ,
   name: 'user',
   img: 'img',
   spotifyUrl: 'url',
   email: 'email',
   isArtist: 'artist',
   matches: [],
   artists: [],
   tracks: [],     genres: []    }
]

var testConcerts = [
    {
        concertId: '123',
        artistId: '12',
        // public
        name: 'concert',
        songkickUrl: 'url',
        venue: 'venue',
        location: 'location',
        artist: 'artist',
        date: 'date',
    }
]

describe('Test userController', () => {
    afterEach(() => {
        jest.restoreAllMocks()
      })

    it('Should handle getPeople when user not logged in', () => {

        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);

        userController.getPeople(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual("User not logged in");
            expect(res.statusCode).toEqual(401);
        });
        
    })

    it('Should handle getPeople', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var testData  = {
                matches: [
                    1
                ]
        };
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.resolve(testData))
            .mockReturnValueOnce(Promise.resolve(testUser));
        

        userController.getPeople(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual([testUserDataTransformed]);
        });
    })

    it('Should handle getPeople error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        jest.spyOn(User, 'findById')
            .mockReturnValue(Promise.reject('error'));
        

        userController.getPeople(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
            expect(res.statusCode).toEqual(500);
        });
    })

    it('Should handle match when user not logged in', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);

        userController.match(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual("User not logged in");
            expect(res.statusCode).toEqual(401);
        });
    })

    it('Should handle match when other persons id is bad', () => {
        req = mocks.createRequest({
            method: 'POST',
            body: {
              id: null
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));

        userController.match(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual("'otherId' field not supplied in request.");
            expect(res.statusCode).toEqual(400);
        });
    })

    it('Should handle match', () => {
        req = mocks.createRequest({
            method: 'POST',
            body: {
              id: '123'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        jest.spyOn(User, 'match')
            .mockReturnValue(Promise.resolve(testUser));

        jest.spyOn(User, 'hasMatch')
            .mockReturnValueOnce(Promise.resolve(true));
        

        userController.match(req,res);
        res.on('send', () => {
            var test =  res._getData();
            expect(test).toEqual({
                isMatch: true,
                data: testUserDataTransformed,
            });
        });
    })

    it('Should handle match error', () => {
        req = mocks.createRequest({
            method: 'POST',
            body: {
              id: '123'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        jest.spyOn(User, 'match')
            .mockReturnValue(Promise.reject('error'));
        

        userController.match(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error: error');
            expect(res.statusCode).toEqual(500);
        });
    })

    it('Should handle getSpotifyProfile', () => {
        req = mocks.createRequest({
            method: 'POST',
            body: {
              code: '123'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        SpotifyAdapter.getAccessToken.mockReturnValue(Promise.resolve('token'));
        SpotifyAdapter.getUserInfo.mockReturnValue(Promise.resolve(testUser));

        userController.getSpotifyProfile(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual(testUser);
        });
    })

    it('Should handle getSpotifyProfile error', () => {
        req = mocks.createRequest({
            method: 'POST',
            body: {
              code: '123'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        SpotifyAdapter.getAccessToken.mockReturnValue(Promise.reject('error'));
        

        userController.getSpotifyProfile(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
            expect(res.statusCode).toEqual(500);
        });
    })

    it('Should handle getTopArtists', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie');
        SpotifyAdapter.getUserTopArtists.mockReturnValue(Promise.resolve('artists'));      

        userController.getTopArtists(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('artists');
        }); 
    })

    it('Should handle getTopArtists when user not logged in', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);
        SpotifyAdapter.getUserTopArtists.mockReturnValue(Promise.resolve('artists'));      

        userController.getTopArtists(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('User not logged in.');
            expect(res.statusCode).toEqual(401);
        }); 
    })

    it('Should handle getTopArtists error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        SpotifyAdapter.getUserTopArtists.mockReturnValue(Promise.reject('error'));      

        userController.getTopArtists(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        }); 
    })

    it('Should handle getTopTracks', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie');
        SpotifyAdapter.getUserTopTracks.mockReturnValue(Promise.resolve('artists'));      

        userController.getTopTracks(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('artists');
        }); 
    })

    it('Should handle getTopTracks when user not logged in', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);
        SpotifyAdapter.getUserTopTracks.mockReturnValue(Promise.resolve('artists'));      

        userController.getTopTracks(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('User not logged in.');
            expect(res.statusCode).toEqual(401);
        }); 
    })

    it('Should handle getTopTracks error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(Promise.resolve('cookie'));
        SpotifyAdapter.getUserTopTracks.mockReturnValue(Promise.reject('error'));      

        userController.getTopTracks(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        }); 
    })

    it('Should handle getMe when user not logged in', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);      

        userController.getMe(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('User not logged in.');
            expect(res.statusCode).toEqual(401);
        });  
    })

    it('Should handle getMe', () => {
        req = mocks.createRequest({
            method: 'POST',
            cookies: {
                session: 'test'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie'); 
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.resolve(testUser));
        userController.getMe(req,res);
        res.on('send', () => {
            var test =  JSON.parse(res._getData());
            expect(test).toEqual(testUserDataTransformedNewUser);
        })
    })

    it('Should handle getMe error', () => {
        req = mocks.createRequest({
            method: 'POST',
            cookies: {
                session: 'test'
            }
        });
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie'); 
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.getMe(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle updateProfile when user not logged in', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);      

        userController.updateProfile(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('User not logged in.');
            expect(res.statusCode).toEqual(401);
        });  
    })

    it('Should handle updateProfile', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie'); 
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.resolve(testUser));

        jest.spyOn(User, 'updateProfile')
            .mockReturnValueOnce(Promise.resolve(testUser));

        userController.updateProfile(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(testUserDataTransformedNewUser);
        })
    })

    it('Should handle updateProfile error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie'); 
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.updateProfile(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle deleteAll error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'deleteAll')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.deleteAll(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle deleteAll', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var data = {deleted: 'done'};
        
        jest.spyOn(User, 'deleteAll')
            .mockReturnValueOnce(Promise.resolve(data));

        userController.deleteAll(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(data);
        })
    })

    it('Should handle deleteUser error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'deleteById')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.deleteUser(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle deleteUser', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var data = {deleted: 'done'};
        
        jest.spyOn(User, 'deleteById')
            .mockReturnValueOnce(Promise.resolve(data));

        userController.deleteUser(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(data);
        })
    })

    it('Should handle getUser error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.getUser(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle getUser', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.resolve(testUser));

        userController.getUser(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(testUserDataTransformedNewUser);
        })
    })

    it('Should handle getArtists error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'findAll')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.getArtists(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle getArtists', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var data = {deleted: 'done'};
        
        jest.spyOn(User, 'findAll')
            .mockReturnValueOnce(Promise.resolve(data));

        userController.getArtists(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(data);
        })
    })

    it('Should handle getUsers error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        jest.spyOn(User, 'findAll')
            .mockReturnValueOnce(Promise.reject('error'));

        userController.getUsers(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle getUsers', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });

        var data = {deleted: 'done'};
        
        jest.spyOn(User, 'findAll')
            .mockReturnValueOnce(Promise.resolve(data));

        userController.getUsers(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(data);
        })
    })
    
    it('Should hange login with old user', () => {
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        SpotifyAdapter.getAccessToken.mockReturnValueOnce(Promise.resolve('code'));
        SpotifyAdapter.getUserInfo.mockReturnValueOnce(Promise.resolve(testUser));

        jest.spyOn(User, 'findBySpotifyId')
            .mockReturnValueOnce(Promise.resolve(testUser));

        userController.login(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(testUserDataTransformedNewUser);
        })
    })

    it('Should handle login with new user', () => {
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        SpotifyAdapter.getAccessToken.mockReturnValueOnce(Promise.resolve('code'));
        SpotifyAdapter.getUserInfo.mockReturnValueOnce(Promise.resolve(testSpotifyUser));
        SpotifyAdapter.getUserTopArtists.mockReturnValueOnce(Promise.resolve([]));
        SpotifyAdapter.getUserTopTracks.mockReturnValueOnce(Promise.resolve([]));

        jest.spyOn(User, 'findBySpotifyId')
            .mockReturnValueOnce(Promise.resolve(null));
    
        jest.spyOn(User, 'create')
            .mockReturnValueOnce(Promise.resolve(testUser));

        jest.spyOn(User, 'updateProfile')
            .mockReturnValueOnce(Promise.resolve(testUser));

        jest.spyOn(User, 'updateMusicProfile')
            .mockReturnValueOnce(Promise.resolve(testUser));

        userController.login(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(testUserDataTransformedNewUser);
        })
    })

    it('Should handle login error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        SpotifyAdapter.getAccessToken.mockReturnValueOnce(Promise.reject('error'));

        userController.login(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        })
    })

    it('Should handle getMatches when not logged in' , () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue(null);      

        userController.getMatches(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('User not logged in.');
            expect(res.statusCode).toEqual(401);
        });  
    })

    it('Should handle getMatches' , () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie');   
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.resolve(testUser));
        
        jest.spyOn(User, 'findAll')
            .mockReturnValue(testUserMatches);

        jest.spyOn(Concert, 'findAll')
            .mockReturnValueOnce(testConcerts)

        userController.getMatches(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toBeDefined();
        });  
    })

    it('Should handle getMatches error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        
        sessions.lookupSession.mockReturnValue('cookie');   
        
        jest.spyOn(User, 'findById')
            .mockReturnValueOnce(Promise.reject('error'));
        
        jest.spyOn(User, 'findAll')
            .mockReturnValue(testUserMatches);

        jest.spyOn(Concert, 'findAll')
            .mockReturnValueOnce(testConcerts)

        userController.getMatches(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('Could not get matches: error');
            expect(res.statusCode).toEqual(500);
        });  
    })
})