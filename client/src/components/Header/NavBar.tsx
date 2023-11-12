import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="ml-4">
            <ul className="flex items-center text-lg text-white tracking-wide">
                <li className="">
                    <NavLink to="/categories" className="px-4 py-2 hover:bg-navy-normal">CATEGORIES</NavLink>
                </li>
                <li className="">
                    <NavLink to="/" className="px-4 py-2 hover:bg-navy-normal">TRANSACTIONS</NavLink>
                </li>
                <li className="">
                    <NavLink to="/reports" className="px-4 py-2 hover:bg-navy-normal">REPORTS</NavLink>
                </li>
                <li className="">
                    <NavLink to="/evolution" className="px-4 py-2 hover:bg-navy-normal">EVOLUTION</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;