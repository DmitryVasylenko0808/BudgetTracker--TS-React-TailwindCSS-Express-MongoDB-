import React from "react";
import { HiOutlineCurrencyDollar, HiUser, HiLogout } from "react-icons/hi";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useAppDispatch, useAppSelect } from "../redux/hooks";
import { logOut } from "../redux/slices/authSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const { login } = useAppSelect(state => state.auth); 

    const handleLogOutClick = () => dispatch(logOut());

    return (
        <header className="sticky top-0 py-6 bg-navy-light shadow-md">
            <div className="max-w-[1440px] mx-auto px-5">
                <div className="flex items-center">
                    <a className="flex items-center gap-x-3 text-white" href="#">
                        <HiOutlineCurrencyDollar size={44} />
                        <h1 className="text-2xl tracking-wide font-bold">MyBudget</h1>
                    </a>
                    <NavBar />
                    <div className="ml-4 flex-auto flex items-center justify-between">
                        <SearchBar />
                        <div className="flex gap-x-2">
                            <div className="flex-auto text-white flex items-center gap-x-2">
                                <HiUser size={30} />
                                <span className="text-lg tracking-wide">{login}</span>
                            </div>
                            <button onClick={handleLogOutClick} className="w-[145px] px-4 py-2 text-white flex items-center gap-x-2 hover:bg-navy-normal">
                                <HiLogout size={30} />
                                <span className="text-lg tracking-wide">Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;