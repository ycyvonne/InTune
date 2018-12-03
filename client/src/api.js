import { get, post } from "./utils/httpHelper";

const config = require("./config");
const serverBaseURL = `http://${config.server.host}:${config.server.port}`;

/** API
 * @module api
 * @description Client side handler for API requests
 */

export function getUsername() {
  return get(`${serverBaseURL}/user/name`).then(res => res);
}

/**
 * Authorize user
 * @name authorize
 * @function
 * @memberof module:api
 */
export function authorize(code) {
  return post(`${serverBaseURL}/user/login`, { code: code }).then(res => res);
}

export function getMatches() {
  return get(`${serverBaseURL}/user/me/matches`).then(res => res);
}

export function makeMatch(userToMatchWithId) {
  return post(`${serverBaseURL}/user/me/match`, { id: userToMatchWithId }).then(
    res => res
  );
}

export function makeConcertMatch(concertToMatchWithId) {
  return post(`${serverBaseURL}/user/me/match-concert`, { id: concertToMatchWithId }).then(
    res => res
  );
}

export function getUserConcerts() {
  return get(`${serverBaseURL}/user/me/concerts`).then(res => res);
}

export function getPeople() {
  return get(`${serverBaseURL}/user/me/people`).then(res => res);
}

export function getConcerts() {
  return get(`${serverBaseURL}/concerts`).then(res => res);
}
