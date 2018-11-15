const request = require('supertest');
const app = require('../app')
const SpotifyAdapter = require('../adapters/SpotifyAdapter');
const SongkickAdapter = require('../adapters/SongkickAdapter');

describe('Test the root path', () => {
    test('It should respond 200 to the root GET', () => {
      return request(app).get('/').expect(200);
    });
})

describe('Test the user router', () => {
  test('It should respond 200 to the root GET', () => {
    return request(app).get('/user').expect(200);
  });

  test('It should respond correctly to an invalid token', () => {
    return SpotifyAdapter.getAccessToken('fdsafdsafas')
            .then(data => {})
            .catch((err) => {
              expect(err).toBe('invalid_token');
            });
  });
})

describe('Test the concert router', () => {

  test('It should respond 200 to the root GET', () => {
    return request(app).get('/concert').expect(200);
  });

  test('It should retrieve events by metro area with status ok', () => {
    return SongkickAdapter.getEventsByMetroArea({})
            .then(data => {
              expect(data.resultsPage.status).toBe('ok')
            });
  });
})