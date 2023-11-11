import React from "react";

type CategoryItemProps = {
    category: { 
        _id: string, 
        title: string, 
        type: string 
    },
    isSelected?: boolean
    onSelect?: (_id: string) => void,
}

const CategoryItem = ({ category, isSelected, onSelect }: CategoryItemProps) => {
    const selectedClassName = isSelected ? "bg-navy-light/20 text-navy-normal" : "";

    return (
        <li
            onClick={() => onSelect && onSelect(category._id)}
            className={`px-1 py-1.5 text-lg cursor-pointer ${selectedClassName} hover:bg-navy-light/20 hover:text-navy-normal`}
        >
            {category.title}
        </li>
    );
}

export default CategoryItem;