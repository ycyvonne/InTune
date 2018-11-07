function UserReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_USER_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'AUTHORIZE':
            return Object.assign({}, state, action.authorize);
        default:
            return state;
    }
}

export default UserReducer;