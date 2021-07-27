import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Search, Auth, Form } from "../../components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";

const Header = () => {
    //const [accessToken, setAccessToken] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        images: "",
    });
    const [playlist, setPlaylist] = useState("");
    /////////=======
    const reduxAccessToken = useSelector(
        (state) => state.accessToken.currentAccessToken
    );
    const dispatch = useDispatch();
    const { getAccessToken } = bindActionCreators(actionCreators, dispatch);
    console.log(reduxAccessToken);

    /////===========

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
            //setAccessToken(access_token);
            getAccessToken(access_token);
        }
    }, []);

    useEffect(() => {
        if (reduxAccessToken !== undefined) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [reduxAccessToken]);

    useEffect(() => {
        if (reduxAccessToken !== undefined) {
            getProfile();
            getPlaylist();
        }
    }, [reduxAccessToken]);

    const getProfile = async () => {
        console.log("masuk");
        try {
            const result = await axios.get(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${reduxAccessToken}`,
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

    const getPlaylist = () => {
        axios
            .get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: "Bearer " + reduxAccessToken,
                },
            })
            .then((response) => {
                setPlaylist(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={style.container}>
            <div className={style.headerSection}>
                <div className={style.authContainer}>
                    <Auth
                        // accessToken={accessToken}
                        getProfile={getProfile}
                        profile={profile}
                        isLoggedIn={isLoggedIn}
                    />
                </div>
                <div className={style.searchContainer}>
                    <Search
                        // accessToken={accessToken}
                        playlist={playlist}
                    />
                </div>
            </div>
            <div className={style.formContainer}>
                <Form
                    // accessToken={accessToken}
                    id={profile.id}
                />
            </div>
        </div>
    );
};

export default Header;
