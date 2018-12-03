const request = require('supertest');
const app = require('../app')
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const SongkickAdapter = require('../adapters/SongkickAdapter');


describe('Test the user router', () => {

  test('It should respond correctly to an invalid token', () => {
    return SpotifyAdapter.getAccessToken('fdsafdsafas')
            .then(data => {})
            .catch((err) => {
              expect(err).toBeDefined();
            });
  });
})

describe('Test the concert router', () => {

  test('It should retrieve events by metro area with status ok', () => {
    return SongkickAdapter.getEventsByMetroArea({})
            .then(data => {
              expect(data).toBeDefined();
            });
  });
})