import { combineReducers } from "redux";
import accessTokenReducer from "./accessTokenReducer";

const reducers = combineReducers({
    accessToken: accessTokenReducer,
});

export default reducers;
