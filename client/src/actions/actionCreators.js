import * as api from "../api";

/** Actions
 * @module actions
 * @requires api
 * @description Client side action dispatcher for global state/store changes
 */

export function getUsername(cb) {
  return (dispatch, prevState) => {
    api
      .getUsername()
      .then(response => dispatch({ name: response, type: "GET_USER_NAME" }))
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.error("Error in getUsername: " + error));
  };
}

/**
 * Action dispatcher to create/login user
 * @name loginUser
 * @function
 * @memberof module:actions
 */
export function loginUser(code) {
  return (dispatch, prevState) => {
    api
      .authorize(code)
      .then(response => dispatch({ user: response, type: "LOGIN" }))
      .catch(error => console.error("Error in loginUser: " + error));
  };
}

export function getLoggedInUser() {
  return (dispatch, prevState) => {
    api
      .authorize()
      .then(response =>
        dispatch({ user: response, type: "GET_LOGGED_IN_USER" })
      )
      .catch(error => console.error("Error in getLoggedInUser: " + error));
  };
}

export function getConcerts(cb) {
  return (dispatch, prevState) => {
    api
      .getConcerts()
      .then(response => dispatch({ concerts: response, type: "GET_CONCERTS" }))
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log("Error in getConcerts: " + error));
  };
}

export function getMatches(cb) {
  return (dispatch, prevState) => {
    api
      .getMatches()
      .then(response => dispatch({ matches: response, type: "GET_MATCHES" }))
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log("Error in getMatches: " + error));
  };
}

export function matchUser(userToMatchWithId, cb) {
  return (dispatch, prevState) => {
    api
      .makeMatch(userToMatchWithId)
      .then(response => dispatch({ matchResult: response, type: "MATCH" }))
      .then(() => {
        if (cb) cb();
      })
      .catch(error => console.log("Error in matchUser: " + error));
  };
}
