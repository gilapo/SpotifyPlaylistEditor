import axios from "axios";
import React from "react";
import qs from "qs";

const App = () => {
    const getAuth = async () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: clientId,
                password: clientSecret,
            },
        };
        const data = {
            grant_type: "client_credentials",
        };
        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                qs.stringify(data),
                headers
            );
            console.log(response);
            return response.data.access_token;
        } catch (error) {
            console.log(error);
        }
    };
    getAuth();
    return (
        <div>
            <h1>hello</h1>
        </div>
    );
};

export default App;
