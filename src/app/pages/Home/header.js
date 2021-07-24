import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Search, Auth, Form } from "../../components";
import axios from "axios";

const Header = () => {
    const [accessToken, setAccessToken] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        images: "",
    });

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
            setAccessToken(access_token);
        }
    }, []);

    useEffect(() => {
        if (accessToken !== undefined) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [accessToken]);

    useEffect(() => {
        if (accessToken !== undefined) {
            getProfile();
        }
    }, [accessToken]);

    const getProfile = async () => {
        console.log("masuk");
        try {
            const result = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setProfile({
                id: result.data.id,
                name: result.data.display_name,
                email: result.data.email,
                images: result.data.images[0],
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.headerSection}>
                <div className={style.authContainer}>
                    <Auth
                        accessToken={accessToken}
                        getProfile={getProfile}
                        profile={profile}
                        isLoggedIn={isLoggedIn}
                    />
                </div>
                <div className={style.searchContainer}>
                    <Search accessToken={accessToken} />
                </div>
            </div>
            <div className={style.formContainer}>
                <Form accessToken={accessToken} id={profile.id} />
            </div>
        </div>
    );
};

export default Header;
