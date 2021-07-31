import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "../pages/Home";
import { useEffect, useState } from "react";

const MyRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); //dumb way fixit later
    /**
     * Move the create playlist page URL to /create-playlist
     * The Create Playlist page only accessible when user already login. If user haven’t logged in, redirect to root URL (/)
     * For the root URL (/)
     * If user haven’t logged in, show the Login link
     * If user already logged in, redirect to Create Playlist page
    //  */
    useEffect(() => {
        if (localStorage.getItem("accessToken") !== undefined) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        // eslint-disable-next-line
    }, [isLoggedIn]);
    console.log(localStorage.getItem("accessToken"));
    return (
        <Router>
            <Switch>
                <Route path="/create-playlist" component={Home} />
                <Route path="/" component={Home} />
            </Switch>
            <div></div>
        </Router>
    );
};

export default MyRouter;
