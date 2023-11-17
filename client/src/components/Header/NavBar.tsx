import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="ml-4">
            <ul className="w-[770px] flex items-center text-white tracking-wide">
                <li className="flex flex-1 items-center justify-center">
                    <NavLink to="/add_transaction" className="navlink">ADD</NavLink>
                </li>
                <li className="flex flex-1 items-center justify-center">
                    <NavLink to="/categories" className="navlink">CATEGORIES</NavLink>
                </li>
                <li className="flex flex-1 items-center justify-center">
                    <NavLink to="/" className="navlink">TRANSACTIONS</NavLink>
                </li>
                <li className="flex flex-1 items-center justify-center">
                    <NavLink to="/reports" className="navlink">REPORTS</NavLink>
                </li>
                <li className="flex flex-1 items-center justify-center">
                    <NavLink to="/evolution" className="navlink">EVOLUTION</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;