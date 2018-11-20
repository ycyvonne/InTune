import * as api from '../api';

/** Actions
 * @module actions
 * @requires api
 * @description Client side action dispatcher for global state/store changes
 */

export function getUsername(cb) {
   return (dispatch, prevState) => {
      api.getUsername()
         .then(response => dispatch({ name: response, type: "GET_USER_NAME" }))
         .then(() => { if (cb) cb(); })
         .catch(error => console.error("Error in getUsername: " + error));
   };
}

/**
 * Action dispatcher for authorization
 * @name authorize
 * @function
 * @memberof module:actions
 */
export function authorize(code) {
      return (dispatch, prevState) => {
            api.authorize(code)
                  .then(response => dispatch({ authorize: response, type: "AUTHORIZE" }))
                  .catch(error => console.error("Error in authorize: " + error));
            };
}