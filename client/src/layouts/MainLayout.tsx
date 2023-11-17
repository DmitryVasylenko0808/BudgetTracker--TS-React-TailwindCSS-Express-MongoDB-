import React, { Suspense } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";
import Loader from "../components/Loader";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="max-w-[1440px] mx-auto py-8 px-5">
                <Suspense fallback={<Loader variant="primary" />}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    );
}

export default MainLayout;