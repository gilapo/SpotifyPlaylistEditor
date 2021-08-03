import React, { useEffect } from "react";
import style from "./style.module.css";
import { loginButton, logoutButton, defaultImage } from "../../assets";
import {  useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";

const Auth = ({ profile, isLoggedIn }) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const scope = `user-read-private%20playlist-modify-private%20playlist-read-private`;
    const url = "http://localhost:3000/";

    // const reduxAccessToken = useSelector(
    //     (state) => state.accessToken.currentAccessToken
    // );
    const dispatch = useDispatch();
    const { getAccessToken } = bindActionCreators(actionCreators, dispatch);

    const loginHandler = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${url}&scope=${scope}&response_type=token&state=123`;
    };

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
            //const { access_token, expires_in, token_type }
            const { access_token } = getReturnedParamsFromSpotifyAuth(
                window.location.hash
            );
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            //localStorage.clear();

            getAccessToken(localStorage.getItem("accessToken"));
            //setAccessToken(access_token);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className={style.profileSection}>
                <button className={style.loginBtn} onClick={loginHandler}>
                    <img src={isLoggedIn ? logoutButton : loginButton} alt="" />
                </button>
                <div className={style.profileContainer}>
                    <img
                        src={profile.images ? profile.images : defaultImage}
                        alt=""
                    />
                    <p>{profile.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
