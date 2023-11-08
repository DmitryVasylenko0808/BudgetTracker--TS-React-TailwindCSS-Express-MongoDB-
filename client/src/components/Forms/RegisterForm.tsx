import { useState } from "react";
import { useSignUpUserMutation } from "../../redux/services/authApi";
import TextField from "../TextField";

type RegisterFormFields = {
    login: { value: string },
    password: { value: string },
    password_confirm: { value: string }
};

const RegisterForm = () => {
    const [error, setError] = useState<any>(null);

    const [signUp, { isLoading }] = useSignUpUserMutation();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & RegisterFormFields;
        const data = {
            login: target.login.value,
            password: target.password.value,
            password_confirm: target.password_confirm.value
        };
        
        await signUp(data).unwrap()
            .then(() => { alert("Success!") })
            .catch(err => { 
                console.log(err);
                setError(err.data); 
            });
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
                title="Password" 
                type="password" 
                isError={error && (error.path === "password_confirm" || error.path === "")} 
                error={error && error.path === "password_confirm" && error.message} 
            />
            <span className="min-h-[14px] text-center text-sm text-red-600">{error && error.path === "" && error.message}</span>
            <button
                type="submit"
                className="py-3 bg-navy-light shadow-xl text-xl text-white font-bold tracking-wide hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Sign Up"}
            </button>
        </form>
    );
}

export default RegisterForm;