import React from "react";
import style from "./style.module.css";
import { TracksContainer } from "../../components";

const Home = () => {
    return (
        <div className={style.homeContainer}>
            <h1>this is home pages</h1>

            <TracksContainer />
        </div>
    );
};

export default Home;
