const initialState = {
    currentIsLoggedIn: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IS_LOGGED_IN":
            return {
                ...state,
                currentIsLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
