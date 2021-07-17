import React from "react";
import style from "./style.module.css";
import { playButton } from "../../assets";
const TrackList = ({ title, album, artist, images }) => {
    return (
        <div>
            <div className={style.trackContent}>
                <div className={style.trackSection}>
                    <img
                        className={style.trackImage}
                        src={images}
                        alt={`cover album ${album}`}
                    />
                    <div className={style.trackTitleSection}>
                        <h4 className={style.trackTitle}>{title}</h4>
                        <p className={style.trackSinger}>{artist}</p>
                    </div>
                </div>
                <div className={style.trackBtnSection}>
                    <button className={style.trackBtn}>
                        <img src={playButton} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackList;
