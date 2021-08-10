import axios from "axios";
import React, { useState } from "react";
import Tracks from "../Tracks";

interface Props {
    accessToken: any;
}

const Search: React.FunctionComponent<Props> = ({ accessToken }) => {
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState<any>();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        console.log(keyword);
    };
    const SearchHandler = async () => {
        try {
            const result = await axios.get(
                `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=2`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const resultContainer = result.data.tracks.items;
            console.log(resultContainer);
            setData(
                resultContainer.map((result: any) => (
                    <Tracks
                        key={result.id}
                        title={result.name}
                        artist={result.artists[0].name}
                        image={result.album.images[2].url}
                        //accessToken={accessToken}
                    />
                ))
            );
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ margin: "20px" }}>
            <input type="text" value={keyword} onChange={onChangeHandler} />
            <button onClick={SearchHandler}>cari</button>
            {data}
        </div>
    );
};

export default Search;
