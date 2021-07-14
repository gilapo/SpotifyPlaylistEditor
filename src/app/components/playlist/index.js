import React from "react";
import { homeWorkData } from "../../adapters";
import style from "./style.module.css";

const Playlist = () => {
    const data = homeWorkData;
    return (
        <div>
            <div className={style.container}>
                <img src={data.album.images[1].url} alt="" />
                <p>{data.name}</p>
                <p>{data.artists[0].name}</p>
                <p>{data.album.name}</p>
                <button>cari</button>
            </div>
        </div>
    );
};

export default Playlist;
