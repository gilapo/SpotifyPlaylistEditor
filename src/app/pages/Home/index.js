import React from "react";
import style from "./style.module.css";
import { homeWorkData } from "../../adapters";
import { MusicCard } from "../../components";

const Home = () => {
    const {
        album: {
            name: albumName,
            artists: [{ name: artist }],
            images: [, mediumImage],
        },
        name: songTitle,
    } = homeWorkData;
    return (
        <div className={style.container}>
            <h1>Create Playlist</h1>
            <MusicCard
                title={songTitle}
                album={albumName}
                artist={artist}
                images={mediumImage}
            />
        </div>
    );
};

export default Home;
