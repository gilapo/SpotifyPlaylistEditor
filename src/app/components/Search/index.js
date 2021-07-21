import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./style.module.css";
import TrackList from "../Track";

const Search = () => {
    const [accessToken, setAccessToken] = useState();
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");

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

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const searchHandler = async () => {
        try {
            const result = await axios.get(
                `https://api.spotify.com/v1/search?q=${search}&type=album&limit=7`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const resultContainer = result.data.albums.items;
            console.log(resultContainer);
            setData(
                resultContainer.map((result) => (
                    <TrackList
                        key={result.id}
                        title={result.name}
                        artist={result.artists[0].name}
                        images={result.images[2].url}
                    />
                ))
            );
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <input
                type="text"
                value={search}
                className={style.inputSearch}
                onChange={handleChange}
            />
            <button onClick={searchHandler}>Cari</button>
            {/* <button onClick={loginHandler}>login</button> */}
            {data}
        </div>
    );
};

export default Search;
