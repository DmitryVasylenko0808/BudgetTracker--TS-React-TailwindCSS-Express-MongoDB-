import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

type SelectProps = {
    title?: string,
    value?: string | number,
    children: React.ReactNode
}

const Select = ({ title, value, children }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(false);
    }, [value]);

    const handleToggleSelect = () => setIsOpen(!isOpen);

    const iconRotateClassName = isOpen ? "rotate-180" : "";

    return (
        <div className="relative">
            <div className="flex flex-col">
                <label>{title}</label>
                <div onClick={handleToggleSelect} className="flex justify-between items-center py-2 border-b-4 border-gray-light cursor-pointer">
                    <span className="">{value}</span>
                    <HiChevronDown size={26} className={`text-navy-strength ${iconRotateClassName}`} />
                </div>
            </div>

            <ul className="w-full max-h-[290px] absolute bg-white top-17 left-0 border-x border-b border-gray-light overflow-y-auto">
                {isOpen && children}
            </ul>
        </div>
    );
}

export default Select;