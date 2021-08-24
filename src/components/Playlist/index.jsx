import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";

const Playlist = () => {
    const { playlistId } = useParams();
    const accessToken = useSelector((state) => state.accessToken.accessToken);
    console.log(playlistId);
    useEffect(() => {
        const getPlaylistItem = () => {
            try {
                axios
                    .get(
                        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                        {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        getPlaylistItem();
    });

    return (
        <div>
            <h1>h</h1>
            <p>d</p>
        </div>
    );
};

export default Playlist;
