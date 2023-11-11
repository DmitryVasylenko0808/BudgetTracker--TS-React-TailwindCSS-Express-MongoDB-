import React from "react";

type SelectItemProps = {
    value: string | number,
    children: React.ReactNode,
    onClick: (value: string | number) => void,
}

const SelectItem = ({ value, children, onClick }: SelectItemProps) => {
    return (
        <li
            onClick={() => onClick(value)}
            className="px-4 py-3 cursor-pointer hover:bg-navy-light/20 hover:text-navy-normal"
        >
            {children}
        </li>
    );
}

export default SelectItem;