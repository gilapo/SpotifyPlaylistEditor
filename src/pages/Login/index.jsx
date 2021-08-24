import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/authenticationSlice";
import { setToken } from "../../redux/features/accessTokenSlice";
import { setExpireIn } from "../../redux/features/tokenExpireSlice";
import { spotifyUtils } from "../../utils/spotifyUtils";
import { Redirect } from "react-router-dom";
import styles from "./style.module.css";
const Login = ({ authStatus }) => {
    const dispatch = useDispatch();

    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce(
            (accumulater, currentValue) => {
                const [key, value] = currentValue.split("=");
                accumulater[key] = value;
                return accumulater;
            },
            {}
        );

        return paramsSplitUp;
    };

    useEffect(() => {
        if (window.location.hash) {
            // const { access_token, expires_in, token_type } =

            const { access_token, expires_in } =
                getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expireIn", expires_in);
            localStorage.setItem("authStatus", "loggedIn");
            dispatch(
                setToken({
                    accessToken: localStorage.getItem("accessToken"),
                })
            );
            dispatch(
                login({ loginStatus: localStorage.getItem("authStatus") })
            );
            dispatch(
                setExpireIn({ expireIn: localStorage.getItem("expireIn") })
            );
        }
    });

    const loginHandler = () => {
        window.location = `${spotifyUtils.authorizeEndpoint}?client_id=${spotifyUtils.authorizeClientId}&redirect_uri=${spotifyUtils.authorizeRedirectUrl}&scope=${spotifyUtils.authorizeScopesUrlParams}&response_type=token&state=123`;
    };
    if (authStatus === "loggedIn") {
        return <Redirect to="/home" />;
    }
    return (
        <div className={styles.login_container}>
            <h1>This is Login Pages</h1>
            <button onClick={loginHandler}>Login</button>
        </div>
    );
};

export default Login;
