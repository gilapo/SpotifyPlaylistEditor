import React from "react";
import "./App.css";
import { Form, Playlist } from "./app";

const App = () => {
    return (
        <div className="root-container">
            <Form />
            <Playlist />
        </div>
    );
};

export default App;
