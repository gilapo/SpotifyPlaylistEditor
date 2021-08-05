import axios from "axios";
import React, { useState } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
//Warning: findDOMNode is deprecated in StrictMode
import "semantic-ui-css/semantic.min.css";
import { Form as SemanticForm } from "semantic-ui-react";

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
    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <div>
            <div className={style.container}>
                <h1>Create Playlist</h1>

                <SemanticForm onSubmit={handleForm}>
                    <SemanticForm.Group widths="equal">
                        <SemanticForm.Input
                            fluid
                            label="Nama Playlist"
                            placeholder="Nama Playlist"
                            id="title"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleInput}
                        />
                    </SemanticForm.Group>

                    <SemanticForm.TextArea
                        label="About"
                        id="description"
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleInput}
                        placeholder="masukkan deskripsi playlist anda"
                    />

                    <SemanticForm.Button>Submit</SemanticForm.Button>
                </SemanticForm>

                {/* <form onSubmit={handleForm}>
                    <label htmlFor="title">Judul </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInput}
                        placeholder="judul..."
                    />
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
                </form> */}
            </div>
        </div>
    );
};

export default Form;
