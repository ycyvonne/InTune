
const utils = require('../utils');

var profile1 = {
    genres:['genre1'],
    artists: ['artist1'],
    songs: ['song1']
}

var profile2 = {
    genres:['genre2'],
    artists: ['artist2'],
    songs: ['song2']
}

describe('Test getScore', () => {
    test('It should do something', () => {
      expect(utils.getScore(profile1, profile2)).toBeDefined();
    });
})