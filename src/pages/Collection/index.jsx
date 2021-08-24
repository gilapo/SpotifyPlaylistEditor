import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { CustomCard } from "../../custom-ui-component";
import { SearchBar } from "../../components";
import { actions } from "../../utils/actionUtils";
import { useHistory } from "react-router";
import { BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
const Collection = () => {
    const [openForm, setOpenForm] = useState(false);
    const [playlistData, setPlaylistData] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
    });
    const accessToken = useSelector((state) => state.accessToken.accessToken);
    const userId = useSelector((state) => state.user.userData.id);
    const history = useHistory();

    useEffect(() => {
        const getPlaylist = () => {
            axios
                .get("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                })
                .then((response) => {
                    const results = response.data.items;
                    setPlaylistData(
                        results.map((data) => (
                            <CustomCard
                                key={data.id}
                                image={data.images[0]?.url}
                                title={data.name}
                                description={data.description}
                                id={data.id}
                                goDetail={playlistDetail}
                            />
                        ))
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getPlaylist();
    }, [accessToken, form]);

    const playlistDetail = (id) => [history.push(`/playlist/${id}`)];

    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const CreatePlaylist = async (event) => {
        event.preventDefault();
        try {
            const result = await axios({
                method: "post",
                url: `https://api.spotify.com/v1/users/${userId}/playlists`,
                data: {
                    name: form.title,
                    description: form.description,
                    public: false,
                    collaborative: false,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style.collectionContainer}>
            <div className={style.collectionNavigator}>
                <h1>Collection</h1>
                <div
                    className={style.playlistCreator}
                    onClick={() => {
                        setOpenForm(true);
                    }}
                >
                    <BiPlus /> <p>Create Playlist</p>
                </div>
            </div>
            {openForm ? (
                <div className={style.formSection}>
                    <button
                        onClick={() => {
                            setOpenForm(false);
                        }}
                    >
                        <IoClose />
                    </button>
                    <form>
                        <label htmlFor="title">Playlist Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="title"
                            value={form.title}
                            onChange={handleInput}
                        />
                        <label htmlFor="description">
                            Playlist Description
                        </label>
                        <textarea
                            name="description"
                            cols="30"
                            rows="10"
                            placeholder="playlist description"
                            value={form.description}
                            onChange={handleInput}
                        ></textarea>
                        <button onClick={CreatePlaylist}>send</button>
                        <button>cancel</button>
                    </form>
                    <div className={style.search_section}>
                        <SearchBar action={actions.add} />
                    </div>
                </div>
            ) : null}
            <div className={style.playlistSection}>{playlistData}</div>
        </div>
    );
};

export default Collection;
