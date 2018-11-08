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