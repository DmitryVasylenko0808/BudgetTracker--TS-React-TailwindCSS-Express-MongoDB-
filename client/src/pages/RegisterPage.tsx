import React from "react";
import { Link } from "react-router-dom";
import TextField from "../components/TextField";

const RegisterPage = () => {
    return (
        <>
            <h1 className="mb-4 text-center text-2xl font-bold">Registration</h1>
            <form className="mb-8 flex flex-col gap-y-6">
                <TextField id="login" title="Login" />
                <TextField id="password" title="Password" type="password" />
                <TextField id="password_confirm" title="Password Confirm" type="password" />
                <button className="py-3 bg-navy-light shadow-xl text-xl text-white font-bold tracking-wide hover:bg-navy-normal">Sign Up</button>
            </form>
            <div className="text-center">Do you have an account? <Link className="text-navy-light hover:underline hover:text-navy-normal" to="/auth/login">Sign In</Link></div>
        </>
    );
}

export default RegisterPage;