const songkickAdapter = require('../adapters/SongkickAdapter');
const Concert = require('../models/Concert');
const concertController = require("../controllers/ConcertController");
jest.mock('../adapters/SongkickAdapter');

var mocks = require('node-mocks-http');

var mockConcert = {
    "id": 35850274,
    "displayName": "Mothica with La Bouquet and Midoca at The Roxy Theatre (December 2, 2018)",
    "uri": "http://www.songkick.com/concerts/35850274-mothica-at-roxy-theatre?utm_source=52612&utm_medium=partner",
    "start": {
        "datetime": "2018-12-02T19:00:00-0800",
    },
    "performance": [
        {
            "id": 68494019,
            "displayName": "Mothica",
            "artist": {
                "id": 8598279,
            }
        }
    ],
    "venue": {
        "displayName": "The Roxy Theatre",
    },
    "location": {
        "city": "West Hollywood, CA, US",
    }
}

describe('Test concertController', () => {
    it('Should get concerts', () => {

        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        songkickAdapter.getEventsByMetroArea.mockReturnValue(Promise.resolve({'events':[mockConcert]}));
        jest.spyOn(Concert, 'findByConcertId')
            .mockImplementationOnce(Promise.resolve(['newConcertCreated']))

        concertController.getConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual([mockConcert]);
        });
        
    })

    it('Should handle getConcert error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        songkickAdapter.getEventsByMetroArea.mockReturnValue(Promise.reject('error'));

        concertController.getConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual({
                error: 'error'
            });
        });

    })
})