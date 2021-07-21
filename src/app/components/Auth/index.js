import React from "react";

const Auth = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URL = "http://localhost:3000/";

    const loginHandler = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URL}&scope=user-read-private%20user-read-email&response_type=token&state=123`;
    };

    return (
        <div>
            <button onClick={loginHandler}>login</button>
        </div>
    );
};

export default Auth;
