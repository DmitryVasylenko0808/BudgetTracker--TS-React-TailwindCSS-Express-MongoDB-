import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="max-w-[1440px] mx-auto py-8 px-5">
                <Outlet />
            </div>
        </>
    );
}

export default MainLayout;