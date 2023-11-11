import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = () => {
    return (
        <label className="px-4 py-2 bg-navy-normal rounded-lg flex items-center gap-x-2 text-lg text-white cursor-text" htmlFor="text">
            <HiOutlineSearch size={30} />
            <input className="max-w-[160px] bg-transparent outline-0" placeholder="Search..." id="text"></input>
        </label>
    );
}

export default SearchBar;