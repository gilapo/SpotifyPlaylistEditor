import React from "react";
import style from "./style.module.css";

const Playlist = ({ title, album, artist, images }) => {
    return (
        <div className={style.container}>
            <img src={images.url} alt="" />
            <p>{title}</p>
            <p>{artist}</p>
            <p>{album}</p>
            <button>cari</button>
        </div>
    );
};

export default Playlist;
