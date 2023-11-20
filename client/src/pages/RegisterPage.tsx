import React from "react";
import { Link } from "react-router-dom";
import TextField from "../components/Commons/TextField";
import RegisterForm from "../components/Forms/RegisterForm";

const RegisterPage = () => {
    return (
        <>
            <h1 className="mb-4 text-center text-2xl font-bold">Registration</h1>
            <RegisterForm />
            <div className="text-center">Do you have an account? <Link className="text-navy-light hover:underline hover:text-navy-normal" to="/auth/login">Sign In</Link></div>
        </>
    );
}

export default RegisterPage;