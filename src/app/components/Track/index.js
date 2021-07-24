import React, { useState } from "react";
import style from "./style.module.css";
import { playButton, selectButton, diselectButton } from "../../assets";
const TrackList = ({ title, album, artist, images }) => {
    const [isActive, setIsActive] = useState(false);
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
                    <button
                        className={style.selectBtn}
                        onClick={() => {
                            setIsActive(isActive ? false : true);
                        }}
                    >
                        <img
                            src={isActive ? diselectButton : selectButton}
                            alt=""
                        />
                    </button>
                    <button className={style.trackBtn}>
                        <img src={playButton} alt="" />
                    </button>
                </div>
            </div>
            <button>tambahkan</button>
        </div>
    );
};

export default TrackList;

/*

call the track in this way inside home page

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

*/
