import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-5">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="p-10 w-[560px] border border-gray-light rounded-lg shadow-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;