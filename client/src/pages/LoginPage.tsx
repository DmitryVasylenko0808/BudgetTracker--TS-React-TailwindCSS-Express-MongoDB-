import React from "react";
import { Link } from "react-router-dom";
import TextField from "../components/TextField";

const LoginPage = () => {
    return (
        <>
            <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
            <form className="mb-8 flex flex-col gap-y-6">
                <TextField id="login" title="Login" />
                <TextField id="password" title="Password" type="password" />
                <button className="py-3 bg-navy-light shadow-xl text-xl text-white font-bold tracking-wide hover:bg-navy-normal">Sign In</button>
            </form>
            <div className="text-center">Do not have an account? <Link className="text-navy-light hover:underline hover:text-navy-normal" to="/auth/registration">Sign Up</Link></div>
        </>
    );
}



export default LoginPage;