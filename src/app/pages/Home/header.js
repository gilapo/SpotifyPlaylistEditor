import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Search, Auth, Form } from "../../components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";

const Header = () => {
    //const [accessToken, setAccessToken] = useState();
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
    const reduxIsloggedIn = useSelector(
        (state) => state.isLoggedIn.currentIsLoggedIn
    );
    const dispatch = useDispatch();
    const { getAccessToken, getIsLoggedIn } = bindActionCreators(
        actionCreators,
        dispatch
    );
    //console.log(reduxIsloggedIn);

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
    useEffect(async () => {
        if (window.location.hash) {
            //const { access_token, expires_in, token_type }
            const { access_token } = getReturnedParamsFromSpotifyAuth(
                window.location.hash
            );
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            //localStorage.clear();

            await getAccessToken(localStorage.getItem("accessToken"));

            //setAccessToken(access_token);
        }
        // eslint-disable-next-line
    }, []);
    console.log(reduxIsloggedIn);
    useEffect(() => {
        if (reduxAccessToken !== undefined) {
            getIsLoggedIn(true);
        } else {
            getIsLoggedIn(false);
        }
        // eslint-disable-next-line
    }, [reduxAccessToken]);

    useEffect(() => {
        if (reduxAccessToken !== undefined) {
            getProfile();
            getPlaylist();
        }
        // eslint-disable-next-line
    }, [reduxAccessToken]);

    useEffect(() => {
        if (reduxIsloggedIn) {
        }
    });

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
                        isLoggedIn={reduxIsloggedIn}
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
                <Form id={profile.id} />
            </div>
        </div>
    );
};

export default Header;
