import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { playButton, selectButton, diselectButton } from "../../assets";
const TrackList = ({ id, title, album, artist, images, playlist }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [addedTracks, setAddedTracks] = useState(); // its only can add 1 music at the time, because added tracks doesnt recive multiple state value, fix it later, go back to sleep

    const dummyPlaylistId = playlist.items[0].id;

    const reduxAccessToken = useSelector(
        (state) => state.accessToken.currentAccessToken
    );

    const addPlaylistHandler = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `https://api.spotify.com/v1/playlists/${dummyPlaylistId}/tracks`,
                data: {
                    uris: [`spotify:track:${addedTracks}`],
                    position: 0,
                },
                headers: {
                    Authorization: `Bearer ${reduxAccessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isSelected) {
            setAddedTracks(id);
        } else {
            setAddedTracks("");
        }
        // eslint-disable-next-line
    }, [isSelected]);

    console.log(isSelected + " " + id);
    console.log(addedTracks);
    return (
        <div>
            <div className={style.trackContent} id={id}>
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
                            setIsSelected(isSelected ? false : true);
                        }}
                    >
                        <img
                            src={isSelected ? diselectButton : selectButton}
                            alt=""
                        />
                    </button>
                    <button className={style.trackBtn}>
                        <img src={playButton} alt="" />
                    </button>
                </div>
            </div>
            <button onClick={addPlaylistHandler}>tambahkan</button>
        </div>
    );
};

export default TrackList;
