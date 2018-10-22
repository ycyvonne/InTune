function UserReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_USER_NAME':
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
}

export default UserReducer;