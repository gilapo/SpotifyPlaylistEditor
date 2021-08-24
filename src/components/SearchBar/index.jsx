import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tracks } from "..";
import { miliSecondToMinutes } from "../../helper/timehelper";
const SearchBar = ({ action }) => {
    const [keyword, setKeyword] = useState("");
    const [searcResult, setSearchresult] = useState("");
    const accessTokenValue = useSelector(
        (state) => state.accessToken.accessToken
    );
    const handleSearch = async (event) => {
        event.preventDefault();
        if (keyword !== "") {
            try {
                const result = await axios.get(
                    `https://api.spotify.com/v1/search?q=${keyword}&type=track,artist,playlist&market=ID&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessTokenValue}`,
                        },
                    }
                );

                const resultContainer = result.data.tracks.items;
                console.log(resultContainer);
                setSearchresult(
                    resultContainer.map((result) => (
                        <Tracks
                            key={result.id}
                            id={result.id}
                            title={result.name}
                            artist={result.artists[0].name}
                            image={result.album.images[2].url}
                            duration={miliSecondToMinutes(result.duration_ms)}
                            album={result.album.name}
                            action={action}
                        />
                    ))
                );
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    onChange={(event) => setKeyword(event.target.value)}
                    required
                />
            </form>
            {searcResult}
        </div>
    );
};

export default SearchBar;
