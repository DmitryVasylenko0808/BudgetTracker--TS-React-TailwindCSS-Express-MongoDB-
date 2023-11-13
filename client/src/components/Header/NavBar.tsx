import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="ml-4">
            <ul className="flex items-center text-lg text-white tracking-wide">
                <li className="">
                    <NavLink to="/categories" className="navlink">CATEGORIES</NavLink>
                </li>
                <li className="">
                    <NavLink to="/" className="navlink">TRANSACTIONS</NavLink>
                </li>
                <li className="">
                    <NavLink to="/reports" className="navlink">REPORTS</NavLink>
                </li>
                <li className="">
                    <NavLink to="/evolution" className="navlink">EVOLUTION</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;