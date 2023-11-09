import React from "react";
import { HiPencil, HiOutlineTrash } from "react-icons/hi";

type MenuCategoriesProps = {
    children: React.ReactNode,
    onRename: () => void,
    onDelete: () => void
}

const MenuCategories = ({ children, onRename, onDelete }: MenuCategoriesProps) => {
    return (
        <div className="w-full mb-4">
            <div className="mb-4 flex justify-evenly">
                <button onClick={onRename} className="w-[140px] py-2 inline-flex items-center justify-center gap-x-2 text-lg font-bold text-navy-light hover:bg-navy-light/20 hover:text-navy-normal">
                    <HiPencil size={30} />
                    RENAME
                </button>
                <button onClick={onDelete} className="w-[140px] py-2 inline-flex items-center justify-center gap-x-2 text-lg font-bold text-navy-light hover:bg-navy-light/20 hover:text-navy-normal">
                    <HiOutlineTrash size={30} />
                    DELETE
                </button>
            </div>
            <div className="w-full flex items-center gap-x-4">
                <label className="">Type:</label>
                <div className="flex-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MenuCategories;