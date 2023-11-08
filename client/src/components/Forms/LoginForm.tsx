import { useState } from "react";
import { useSignInUserMutation } from "../../redux/services/authApi";
import TextField from "../TextField";

type LoginFormFields = {
    login: { value: string },
    password: { value: string }
};

const LoginForm = () => {
    const [error, setError] = useState<any>(null);

    const [signIn, { isLoading }] = useSignInUserMutation();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & LoginFormFields;
        const data = {
            login: target.login.value,
            password: target.password.value
        };
        
        await signIn(data).unwrap()
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
            <span className="min-h-[14px] text-center text-sm text-red-600">{error && error.path === "" && error.message}</span>
            <button
                type="submit"
                className="py-3 bg-navy-light shadow-xl text-xl text-white font-bold tracking-wide hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Sign In"}
            </button>
        </form>
    );
}

export default LoginForm;