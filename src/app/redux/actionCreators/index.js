const getAccessToken = (newAccessToken) => {
    return (dispatch) => {
        dispatch({
            type: "GET_ACCESS_TOKEN",
            payload: newAccessToken,
        });
    };
};

const getIsLoggedIn = (newIsLoggedIn) => {
    return (dispatch) => {
        dispatch({
            type: "SET_IS_LOGGED_IN",
            payload: newIsLoggedIn,
        });
    };
};

export { getAccessToken, getIsLoggedIn };
