const initialState = {
    currentAccessToken: undefined,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ACCESS_TOKEN":
            return {
                ...state,
                currentAccessToken: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
