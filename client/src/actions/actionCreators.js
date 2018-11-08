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

export function authorize(code) {
      return (dispatch, prevState) => {
            api.authorize(code)
                  .then(response => dispatch({ authorize: response, type: "AUTHORIZE" }))
                  .catch(error => console.error("Error in authorize: " + error));
            };
}