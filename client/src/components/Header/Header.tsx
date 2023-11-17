import React from "react";
import { HiOutlineCurrencyDollar, HiUser, HiLogout } from "react-icons/hi";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useAppDispatch, useAppSelect } from "../../redux/hooks";
import { logOut } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { login } = useAppSelect(state => state.auth); 

    const handleLogOutClick = () => {
        dispatch(logOut());
        navigate("/auth/login");
    };

    return (
        <header className="sticky top-0 z-20 bg-navy-light shadow-md">
            <div className="max-w-[1440px] mx-auto px-5">
                <div className="flex items-center">
                    <a className="flex items-center gap-x-3 text-white" href="#">
                        <HiOutlineCurrencyDollar size={44} />
                        <h1 className="text-2xl tracking-wide font-bold">MyBudget</h1>
                    </a>
                    <NavBar />
                    <div className="ml-4 flex-auto flex items-center justify-between gap-x-6">
                        <div className="w-[270px]">
                            <SearchBar />
                        </div>
                        <div className="group relative">
                            <div className="flex-auto text-white flex items-center gap-x-2">
                                <HiUser size={30} />
                                <span className="text-lg tracking-wide">{login}</span>
                            </div>
                            <div className="hidden absolute top-[30px] left-[-65px] group-hover:block">
                                <button 
                                    onClick={handleLogOutClick} 
                                    className="w-[145px] px-4 py-3 bg-white border border-gray-light shadow-xl 
                                    flex items-center gap-x-2 text-navy-light 
                                    hover:bg-gray-light"
                                >
                                    <HiLogout size={30} />
                                    <span className="text-lg tracking-wide">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;