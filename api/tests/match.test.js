
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

var profile3 = {
  genres:['genre2'],
  artists: ['artist1'],
  songs: ['song1']
}

describe('Test getScore', () => {
    test('Should have a score of 0 if no similarities between profiles', () => {
      expect(utils.getScore(profile1, profile2)).toEqual(0);
    });

    test('Should give higher score to profiles that are more similar', () => {
      var moreSimilar = utils.getScore(profile1, profile3);
      var lessSimilar = utils.getScore(profile2, profile3);
      expect(moreSimilar).toBeGreaterThan(lessSimilar);
    })
})