import React, { useState, useEffect } from "react";
import { Search } from "../../components";

const Home: React.FunctionComponent = () => {
    const [accessToken, setAccessToken]: [any, any] = useState();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const scope = process.env.REACT_APP_SPOTIFY_SCOPE;
    const url = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
    const loginHandler = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${url}&scope=${scope}&response_type=token&state=123`;
    };
    const getReturnedParamsFromSpotifyAuth = (hash: any) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split("&");
        const paramsSplitUp = paramsInUrl.reduce(
            (accumulater: any, currentValue: any) => {
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

            setAccessToken(access_token);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <button onClick={loginHandler}>Login</button> <br />
            <Search accessToken={accessToken} />
        </div>
    );
};

export default Home;
