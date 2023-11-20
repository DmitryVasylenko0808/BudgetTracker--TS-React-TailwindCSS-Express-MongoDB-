import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Loader from "../components/Commons/Loader";

const AuthLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-5">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="p-10 w-[560px] border border-gray-light shadow-xl">
                    <Suspense fallback={<Loader variant="primary" />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;