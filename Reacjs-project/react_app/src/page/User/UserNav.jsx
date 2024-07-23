import React, { Suspense, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Navigation";
import Home from "./Home";
import ListUrl from "./ListUrl";
const UserNavigation = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex bg-white flex-col flex-1">
                <Nav />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="url" element={<ListUrl />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default UserNavigation