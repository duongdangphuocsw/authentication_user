const INITIAL_STATE = {
    id: '',
    username: '',
    jwt: '',
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                username: action.payload.data.username,
                jwt: action.payload.data.jwt,
                isAuthenticated: true,
                isLoading: false,
                id: action.payload.data.id
            }
            break;
        default:
            return state;
            break;
    }
}

export default userReducer