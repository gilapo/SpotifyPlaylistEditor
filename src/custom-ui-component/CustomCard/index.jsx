import React from "react";
import style from "./style.module.css";
import { defaultImage } from "../../assets";
const CustomCard = ({ image, title, description, goDetail, id }) => {
    return (
        <div className={style.cardContainer} onClick={() => goDetail(id)}>
            <div className={style.imageSection}>
                <img
                    src={image ? image : defaultImage}
                    alt={`${title} cover`}
                    className={style.playlistCover}
                />
            </div>
            <div className={style.titleSection}>
                <h3 className={style.playlistTitle}>{title}</h3>
                <p className={style.playlistDescription}>{description}</p>
            </div>
        </div>
    );
};

export default CustomCard;
