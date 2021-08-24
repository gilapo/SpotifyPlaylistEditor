import React, { useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import { setUserData } from "../../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authenticationSlice";
import { BiCaretDown } from "react-icons/bi";

const Navbar = () => {
    const accessToken = useSelector((state) => state.accessToken.accessToken);
    const userData = useSelector((state) => state.user.userData);
    const tokenExpire = useSelector((state) => state.expireIn.expireIn);
    const expireTime = parseInt(tokenExpire) * 1000 - 100;
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            try {
                const result = await axios.get(
                    "https://api.spotify.com/v1/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                if (result) {
                    dispatch(
                        setUserData({
                            userData: {
                                id: result.data.id,
                                name: result.data.display_name,
                                image: result.data.images[0],
                            },
                        })
                    );
                }
            } catch (err) {
                console.error(err);
            }
        };
        const timeOut = () => {
            setTimeout(() => {
                logoutHandler();
            }, expireTime);
        };
        getUserData();
        timeOut();
    }, [accessToken, dispatch]);
    const logoutHandler = () => {
        localStorage.clear();
        dispatch(logout());
    };
    return (
        <div className={style.navberContainer}>
            <div className={style.profileContainer}>
                <div className={style.imageContainer}>
                    <img src={userData.image.url} alt="" />
                </div>
                <p className={style.userNameContainer}>{userData.name}</p>
                <BiCaretDown />
                <button onClick={logoutHandler}>logout</button>
            </div>
        </div>
    );
};

export default Navbar;