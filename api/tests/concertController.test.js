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
    it('Should get concerts and not insert if already there', () => {

        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        songkickAdapter.getEventsByMetroArea.mockReturnValue(Promise.resolve([mockConcert]));
        jest.spyOn(Concert, 'findByConcertId')
            .mockReturnValueOnce(Promise.resolve('test'));

        concertController.getConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual([mockConcert]);
        });
        
    })

    it('Should get concerts and insert if not already there', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        songkickAdapter.getEventsByMetroArea.mockReturnValue(Promise.resolve([mockConcert]));
        jest.spyOn(Concert, 'findByConcertId')
            .mockReturnValueOnce(Promise.resolve(null));

        jest.spyOn(Concert,'create')
            .mockReturnValueOnce(Promise.resolve('concert created!'));

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
            var test = res._getData();
            expect(test).toEqual('error');
        });

    })

    it('Should handle deleteAll', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        var returnedValue = {deleted: 'done'};
        jest.spyOn(Concert, 'deleteAll')
            .mockReturnValueOnce(Promise.resolve(returnedValue));

        concertController.deleteAll(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(returnedValue);
        });
    })

    it('Should handle deleteAll error', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        var returnedValue = {deleted: 'done'};
        jest.spyOn(Concert, 'deleteAll')
            .mockReturnValueOnce(Promise.reject('error'));

        concertController.deleteAll(req,res);
        res.on('send', () => {
            var test = res._getData();
            expect(test).toEqual('error');
        });
    })

    it('Should handle getAllConcerts' , () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        var returnedValue = {concert: 'done'};
        jest.spyOn(Concert, 'findAll')
            .mockReturnValueOnce(Promise.resolve(returnedValue));

        concertController.getAllConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(returnedValue);
        });
    })

    it('Should handle getAllConcerts error' , () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        var returnedValue = {concert: 'done'};
        jest.spyOn(Concert, 'findAll')
            .mockReturnValueOnce(Promise.reject(returnedValue));

        concertController.getAllConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual(returnedValue);
        });
    })
})