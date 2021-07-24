import React from "react";
import style from "./style.module.css";
import { loginButton, logoutButton, defaultImage } from "../../assets";

const Auth = ({ accessToken, getProfile, profile, isLoggedIn }) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const url = "http://localhost:3000/";

    const loginHandler = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${url}&scope=user-read-private%20user-read-email%20playlist-modify-private&response_type=token&state=123`;
    };

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
