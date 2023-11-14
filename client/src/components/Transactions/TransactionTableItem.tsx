import React from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { Transaction } from "../../redux/services/types";
import { formatDate } from "../../utils/formatDate"; //
import CheckBox from "../CheckBox";


type TransactionsTableItemProps = {
    isSelected: boolean,
    transaction: Transaction,
    onSelect: () => void
};

const TransactionsTableItem = ({ isSelected, transaction, onSelect }: TransactionsTableItemProps) => {
    const selectedClassName = isSelected ? "bg-navy-light/20 odd:bg-navy-light/20" : "";

    return (
        <tr onClick={onSelect} className={`flex odd:bg-gray-light/50 hover:bg-navy-light/20 ${selectedClassName}`}>
            <td className="px-4 py-2 border-x border-gray-light">
                <CheckBox isChecked={isSelected} onChange={onSelect} />
            </td>
            <td className="px-4 py-2 border-x border-gray-light w-[160px]">{formatDate(transaction.date as Date)}</td>
            <td className="px-4 py-2 border-x border-gray-light flex-auto">{transaction.description}</td>
            <td className="px-4 py-2 border-x border-gray-light w-[150px]">{transaction.category?.title}</td>
            <td className="px-4 py-2 border-x border-gray-light w-[130px] flex items-center gap-x-1">
                {transaction.type === "Income" 
                    ? <HiArrowNarrowUp size={20} color="#82ca9d" /> 
                    : <HiArrowNarrowDown size={20} color="#f87171" />
                } 
                {transaction.type}
            </td>
            <td className="px-4 py-2 border-x border-gray-light w-[170px]">{transaction.sum.toFixed(2)}</td>
        </tr>
    );
}

export default TransactionsTableItem;