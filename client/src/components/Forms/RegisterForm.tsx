import React, { useEffect, useState } from "react";
import { useSignUpUserMutation } from "../../redux/services/authApi";
import TextField from "../TextField";
import SnackBar from "../SnackBar";
import Loader from "../Loader";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type RegisterFormFields = {
    login: { value: string },
    password: { value: string },
    password_confirm: { value: string }
};

const RegisterForm = () => {
    let timeoutId: NodeJS.Timeout;

    const [error, setError] = useState<any>(null);
    const [isShown, setIsShown] = useState<boolean>(false);

    const [signUp, { isLoading }] = useSignUpUserMutation();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & RegisterFormFields;
        const data = {
            login: target.login.value,
            password: target.password.value,
            password_confirm: target.password_confirm.value
        };

        signUp(data).unwrap()
            .then(() => {
                setError(null);
                setIsShown(true);
                timeoutId = setTimeout(() => setIsShown(false), 5000);
            })
            .catch(err => {
                setError(err.data);
            });
    }

    const handleCloseSnackBar = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsShown(false);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-y-4">
            <TextField
                id="login"
                title="Login"
                isError={error && (error.path === "login" || error.path === "")}
                error={error && error.path === "login" && error.message}
            />
            <TextField
                id="password"
                title="Password"
                type="password"
                isError={error && (error.path === "password" || error.path === "")}
                error={error && error.path === "password" && error.message}
            />
            <TextField
                id="password_confirm"
                title="Confirm Password"
                type="password"
                isError={error && (error.path === "password_confirm" || error.path === "")}
                error={error && error.path === "password_confirm" && error.message}
            />
            <span className="min-h-[14px] text-center text-sm text-red-600">{error && error.path === "" && error.message}</span>

            <button
                type="submit"
                className="h-[52px] flex justify-center items-center bg-navy-light shadow-xl 
                text-xl text-white font-bold tracking-wide 
                hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? <Loader variant="secondary" /> : "Sign Up"}
            </button>

            <AnimatePresence>
                {isShown && 
                    <SnackBar onClose={handleCloseSnackBar}>
                        <span className="flex gap-x-1">
                            Registration is successfully completed. 
                            <Link className="text-navy-light font-bold hover:underline hover:text-navy-normal" to="/auth/login">Sign In</Link>
                        </span>
                    </SnackBar>
                }
            </AnimatePresence>
        </form>
    );
}

export default RegisterForm;