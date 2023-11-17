import React from "react";
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import TransactionFilter from "./TransactionsFilter";

type TransactionsMenuProps = {
    isDisabledEdit: boolean,
    isDisabledDelete: boolean,
    onEdit: () => void,
    onDelete: () => void,
};

const TransactionsMenu = ({ isDisabledEdit, isDisabledDelete, onEdit, onDelete }: TransactionsMenuProps) => {
    return (
        <div className="flex items-center gap-x-4">
            <button
                onClick={onEdit}
                className="w-[160px] py-2 inline-flex items-center justify-center gap-x-2 
                text-lg font-bold text-navy-light hover:bg-navy-light/20 hover:text-navy-normal
                disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-navy-light"
                disabled={isDisabledEdit}
            >
                <HiPencil size={30} />
                EDIT
            </button>
            <button
                onClick={onDelete}
                className="w-[160px] py-2 inline-flex items-center justify-center gap-x-2 
                text-lg font-bold text-navy-light hover:bg-navy-light/20 hover:text-navy-normal
                disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-navy-light"
                disabled={isDisabledDelete}
            >
                <HiOutlineTrash size={30} />
                DELETE
            </button>

            <TransactionFilter />
        </div>
    );
}



export default TransactionsMenu;