import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search/${search}`, { replace: true });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <label className="px-4 py-2 bg-navy-normal rounded-lg flex items-center gap-x-2 text-lg text-white cursor-text" htmlFor="text">
            <HiOutlineSearch size={30} onClick={handleSearch} />
            <input onChange={handleChange} className="max-w-[160px] bg-transparent outline-0" placeholder="Search..." id="text"></input>
        </label>
    );
}

export default SearchBar;