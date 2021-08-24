import React, { useState } from "react";
import styles from "./style.module.css";
import { actions } from "../../utils/actionUtils";
import { BiHeart } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

const Tracks = ({
    image,
    title,
    artist,
    album,
    plays,
    duration,
    action = actions.like,
}) => {
    const [isSelected, setIsSelected] = useState(false);

    const ActionButton = () => {
        if (action === actions.like) {
            return (
                <div
                    className={styles.trackLike}
                    onClick={() => setIsSelected(isSelected ? false : true)}
                >
                    {isSelected ? (
                        <AiFillHeart size={20} />
                    ) : (
                        <BiHeart size={20} />
                    )}
                </div>
            );
        }
        if (action === actions.add) {
            return <button className={styles.track_add}>Add</button>;
        }
    };
    return (
        <div className={styles.trackContainer}>
            <div className={styles.coreSection}>
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
            {duration ? (
                <p className={styles.trackDuration}>{duration}</p>
            ) : null}
            <div className={styles.action_section}>
                <ActionButton />
            </div>
        </div>
    );
};

export default Tracks;
