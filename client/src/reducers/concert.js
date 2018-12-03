/** Actions
 * @module reducers
 * @requires actions
 * @description Client side reducer to state/store updates
 */

/**
 * @description Makes global state/store updates according to received action
 * @name ConcertReducer
 * @function
 * @memberof module:reducers
 */
function ConcertReducer(state = {}, action) {
  switch (action.type) {
    case "GET_CONCERTS":
      var concertsData = {};
      if (!action.concerts.error) {
        concertsData = Object.assign({}, action.concerts, {
          fetched: true
        });
      }
      return Object.assign({}, state, {
        concertsData: concertsData
      });
    default:
      return state;
  }
}

export default ConcertReducer;
