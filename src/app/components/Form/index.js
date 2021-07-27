import axios from "axios";
import React, { useState } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";

const Form = ({ id }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
    });
    const reduxAccessToken = useSelector(
        (state) => state.accessToken.currentAccessToken
    );

    const handleForm = async (event) => {
        console.log(`https://api.spotify.com/v1/users/${id}/playlists`);
        //https://api.spotify.com/v1/users/z8c9e9v24nt73mfclhzpakxyl/playlists
        console.log(form.title);
        console.log(form.description);
        event.preventDefault();
        try {
            const result = await axios({
                method: "post",
                url: `https://api.spotify.com/v1/users/${id}/playlists`,
                data: {
                    name: form.title,
                    description: form.description,
                    public: false,
                    collaborative: false,
                },
                headers: {
                    Authorization: `Bearer ${reduxAccessToken}`,
                },
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    // post(
    //     `https://api.spotify.com/v1/users/${id}/playlists`,
    //     {
    //         data: {
    //             name: form.title,
    //             public: false,
    //             collaborative: false,
    //             description: form.description,
    //         },
    //     },
    //     {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <div>
            <div className={style.container}>
                <h1>Create Playlist</h1>
                <form onSubmit={handleForm}>
                    <label htmlFor="title">Judul </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInput}
                    />{" "}
                    <br />
                    <label htmlFor="description">Deskripsi </label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleInput}
                    />{" "}
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    );
};

export default Form;
