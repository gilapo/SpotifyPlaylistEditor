import React from "react";
import style from "./style.module.css";
import { Search, Auth } from "../../components";

const Home = () => {
    return (
        <div className={style.container}>
            <div className={style.authContainer}>
                <Auth />
            </div>
            <div className={style.searchContainer}>
                <Search />
            </div>
        </div>
    );
};

export default Home;
