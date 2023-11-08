import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";

const LoginPage = () => {
    return (
        <>
            <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
            <LoginForm />
            <div className="text-center">Do not have an account? <Link className="text-navy-light hover:underline hover:text-navy-normal" to="/auth/registration">Sign Up</Link></div>
        </>
    );
}



export default LoginPage;