import React from "react";
import style from "./style.module.css";
import { Search, Auth } from "../../components";

const Home = () => {
    return (
        <div className={style.container}>
            <div className={style.searchContainer}>
                <Search />
                <Auth />
            </div>
        </div>
    );
};

export default Home;
