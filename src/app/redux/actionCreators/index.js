export const getAccessToken = (newAccessToken) => {
    return (dispatch) => {
        dispatch({
            type: "GET_ACCESS_TOKEN",
            payload: newAccessToken,
        });
    };
};
