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
        case 'GET_USER_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'AUTHORIZE':
            var spotifyData = {};
            if (!action.authorize.error) {
                spotifyData = Object.assign({}, action.authorize, {
                    fetched: true
                });
            }

            return Object.assign({}, state, {
                spotifyData: spotifyData
            });
        default:
            return state;
    }
}

export default UserReducer;