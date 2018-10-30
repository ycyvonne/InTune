import * as api from '../api';

/**
 * @description Calls the API method to get username and update store
 */
export function getUsername(cb) {
   return (dispatch, prevState) => {
      api.getUsername()
         .then(response => dispatch({ name: response, type: "GET_USER_NAME" }))
         .then(() => { if (cb) cb(); })
         .catch(error => console.error("Error in getUsername: " + error));
   };
}

export function login() {
    return (dispatch, prevState) => {
        api.login()
            .then(response => dispatch({ name: response, type: "LOGIN" }))
            .catch(error => console.error("Error in login: " + error));
    };
}