import React from "react";
import style from "./style.module.css";
import { trackData } from "../../adapters";
import { TrackList } from "../../components";

const Home = () => {
    const tracks = trackData.map((track, index) => {
        return (
            <TrackList
                key={index}
                title={track.name}
                album={track.album.name}
                artist={track.artists[0].name}
                images={track.album.images[2].url}
            />
        );
    });

    return (
        <div className={style.container}>
            <div className={style.trackContainer}>
                <h1>Your Tracks</h1>
                {tracks}
            </div>
        </div>
    );
};

export default Home;
