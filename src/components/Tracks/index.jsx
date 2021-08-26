import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { actions } from "../../utils/actionUtils";
import { BiHeart, BiListPlus, BiListCheck } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

const Tracks = ({
    image,
    title,
    artist,
    album,
    plays,
    duration,
    action = actions.like,
    index,
    id,
}) => {
    const [addedTracks, setAddedTracks] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const currentPlaylistId = useSelector(
        (state) => state.currentPlaylist.playlistId
    );
    const accessToken = useSelector((state) => state.accessToken.accessToken);

    useEffect(() => {
        if (isSelected) {
            addPlaylistHandler();
        } else {
            setAddedTracks("");
        }
    }, [isSelected]);

    const addPlaylistHandler = async () => {
        console.log("here");
        try {
            const response = await axios({
                method: "post",
                url: `https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`,
                data: {
                    uris: [`spotify:track:${addedTracks}`],
                    position: 0,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const ActionButton = () => {
        if (action === actions.like) {
            return (
                <div
                    className={styles.trackLike}
                    onClick={() => setIsSelected(isSelected ? false : true)}
                >
                    {isSelected ? (
                        <AiFillHeart size={20} color="red" />
                    ) : (
                        <BiHeart size={20} />
                    )}
                </div>
            );
        }
        if (action === actions.add) {
            return (
                <div
                    className={styles.trackAdd}
                    onClick={() => setIsSelected(true)}
                >
                    {isSelected ? (
                        <BiListCheck size={30} color="#1DB956" />
                    ) : (
                        <BiListPlus
                            size={30}
                            onClick={() => setAddedTracks(id)}
                        />
                    )}
                </div>
            );
        }
    };
    return (
        <div className={styles.trackContainer} id={id}>
            <div className={styles.coreSection}>
                <p>{index + 1}</p>
                <div className={styles.imageSection}>
                    <img
                        src={image}
                        alt={`${album} cover`}
                        className={styles.trackImage}
                    />
                </div>
                <div className={styles.titleSection}>
                    <h3 className={styles.trackTitle}>{title}</h3>
                    <p className={styles.trackArtist}>{artist}</p>
                </div>
            </div>

            <div className={styles.detailSection}>
                <p className={styles.trackAlbum}>{album}</p>
                {plays ? <p className={styles.trackPlays}>{plays}</p> : null}
            </div>
            <div className={styles.actionSection}>
                {duration ? (
                    <p className={styles.trackDuration}>{duration}</p>
                ) : null}
                <ActionButton />
            </div>
        </div>
    );
};

export default Tracks;
