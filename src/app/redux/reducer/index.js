import { combineReducers } from "redux";
import accessTokenReducer from "./accessTokenReducer";
import isLoggedInreducer from "./isLoggedInReducer";

const reducers = combineReducers({
    accessToken: accessTokenReducer,
    isLoggedIn: isLoggedInreducer,
});

export default reducers;
