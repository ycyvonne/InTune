const songkickAdapter = require('../adapters/SongkickAdapter');
const concertController = require("../controllers/ConcertController");
jest.mock('../adapters/SongkickAdapter');

var mocks = require('node-mocks-http');

describe('Test concertController', () => {
    it('Should get concerts', () => {
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        songkickAdapter.getEventsByMetroArea.mockReturnValue(Promise.resolve('testData'));

        concertController.getConcerts(req,res);
        res.on('send', () => {
            var test = JSON.parse(res._getData());
            expect(test).toEqual('testData');
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