import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLink } from '@fortawesome/free-solid-svg-icons';
import UserPopup from './UserPopup';
import '../../index.css'
const Nav = () => {
    console.log(`Bearer ${window.localStorage.getItem("refreshToken")}`);
    return (
        <div className="bg-white top-0 sticky z-10 shadow-lg font-karla">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start my-5 items-start">
                        <p style={{ fontFamily: 'Lobster, cursive' }} className="text-[#6FD7EE] text-center text-5xl mb-8 font-semibold">
                            Short link
                        </p>
                    </div>
                    <div className="flex gap-4 md:gap-8 items-center">
                        <Link
                            to="/home/"
                            className="text-xl font-bold text-[#546869]"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <FontAwesomeIcon icon={faHome} className="mr-1 mt-1" color="#546869" />
                            Trang chủ
                        </Link>
                        <Link
                            to="/home/url"
                            className="text-xl font-bold text-[#546869]"
                            data-test="main-products"
                            style={{ fontFamily: 'Lobster, cursive' }}
                        >
                            <FontAwesomeIcon icon={faLink} className="mr-1 mt-1" color="#546869" />
                            Url
                        </Link>
                        <UserPopup />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;