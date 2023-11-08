import React from "react";
import { useAuth } from "..";
import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
    const { isAuthorized } = useAuth();

    return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default RequireAuth;