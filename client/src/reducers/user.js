/** Actions
 * @module reducers
 * @requires actions
 * @description Client side reducer to state/store updates
 */

/**
 * Makes global state/store updates according to received action
 * @name UserReducer
 * @function
 * @memberof module:reducers
 */
function UserReducer(state = {}, action) {
  switch (action.type) {
    case "GET_USER_NAME":
      return {
        ...state,
        name: action.name
      };
    case "LOGIN":
      var spotifyData = {};
      if (!action.user.error) {
        spotifyData = Object.assign({}, action.user, {
          fetched: true
        });
      }
      return Object.assign({}, state, {
        spotifyData: spotifyData
      });
    case "GET_LOGGED_IN_USER":
      // if user is logged in
      if (action.user.id) {
        return Object.assign({}, state, {
          spotifyData: action.user
        });
      }
      // else, don't change anything
      return state;
    case "GET_MATCHES":
      // console.log('matches data', action.matches)
      return Object.assign({}, state, {
        matchesData: action.matches.matches
      })
    case "MATCH":
      console.log('action', action.matchResult)
      return Object.assign({}, state, {
        matchResults: action.matchResult
      });
    default:
      return state;
  }
}

export default UserReducer;
