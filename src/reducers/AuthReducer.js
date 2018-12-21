
const defaultState = {
    login: true
};

const AuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, login: true};
        default:
            return state;
    }
};

export default AuthReducer;