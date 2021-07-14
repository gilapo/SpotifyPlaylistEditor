import React from "react";
import style from "./style.module.css";

const form = () => {
    return (
        <div>
            <div className={style.container}>
                <h1>Create Playlist</h1>
                <form action="#">
                    <label htmlFor="title">Judul </label>
                    <input type="text" name="title" /> <br />
                    <label htmlFor="description">Deskripsi </label>
                    <input type="text" name="description" /> <br />
                    <input type="submit" value="kirim" />
                </form>
            </div>
        </div>
    );
};

export default form;
