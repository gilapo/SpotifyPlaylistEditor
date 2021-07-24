import React, { useState } from "react";
import axios from "axios";
import style from "./style.module.css";
import TrackList from "../Track";

const Search = ({ accessToken }) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const searchHandler = async () => {
        try {
            const result = await axios.get(
                `https://api.spotify.com/v1/search?q=${search}&type=album&limit=2`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const resultContainer = result.data.albums.items;
            //console.log(resultContainer);
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
