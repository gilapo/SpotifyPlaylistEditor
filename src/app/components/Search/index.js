import React, { useState } from "react";
import axios from "axios";
import style from "./style.module.css";
import TrackList from "../Track";
import { useSelector } from "react-redux";

const Search = ({
    //accessToken,
    playlist,
}) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);

    const reduxAccessToken = useSelector(
        (state) => state.accessToken.currentAccessToken
    );

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const searchHandler = async () => {
        try {
            const result = await axios.get(
                `https://api.spotify.com/v1/search?q=${search}&type=track&limit=2`,
                {
                    headers: {
                        Authorization: `Bearer ${reduxAccessToken}`,
                    },
                }
            );

            const resultContainer = result.data.tracks.items;
            console.log(resultContainer);
            setData(
                resultContainer.map((result) => (
                    <TrackList
                        key={result.id}
                        id={result.id}
                        title={result.name}
                        artist={result.artists[0].name}
                        images={result.album.images[2].url}
                        playlist={playlist}
                        //accessToken={accessToken}
                    />
                ))
            );
        } catch (error) {
            console.error(error);
        }
    };

    const history = () => {
        setSearchHistory(data);
    };

    return (
        <div>
            <div className={style.searchSection}>
                <input
                    className={style.searchBar}
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Cari.."
                    onKeyPress={(e) =>
                        e.key === "Enter" && searchHandler() && history()
                    }
                />
            </div>
            {data}
            <h4>Previous Search</h4> <hr />
            {searchHistory}
        </div>
    );
};

export default Search;
