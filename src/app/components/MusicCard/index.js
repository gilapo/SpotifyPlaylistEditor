import React from "react";
import style from "./style.module.css";
import { playButton } from "../../assets";
const MusicCard = ({ title, album, artist, images }) => {
    return (
        <div className={style.card}>
            <p className={style.songAlbum}>{album}</p>
            <img src={images.url} className={style.albumImage} alt="" />
            <div className={style.playSection}>
                <button className={style.btnPlay}>
                    <img src={playButton} alt="" />
                </button>
                <div>
                    <h4 className={style.songTitle}>{title}</h4>
                    <h5 className={style.songArtist}>{artist}</h5>
                </div>
            </div>
        </div>
    );
};

export default MusicCard;
