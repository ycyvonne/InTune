const User = require("../models/User"); // eslint-disable-line
const Concert = require("../models/Concert");
const SpotifyAdapter = require("../adapters/SpotifyAdapter");
const sessions = require("../sessions");
const util = require("../utils");

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

})