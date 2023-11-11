import React from "react";
import { Transaction } from "../../redux/services/types";
import TransactionsTableItem from "./TransactionTableItem";

type TransactionsTableProps = {
    transactions: Transaction[],
    selectedTransactions: Transaction[],
    isSelectedAll: boolean,
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSelectItem: (id: string) => void
}

const TransactionsTable = ({ transactions, selectedTransactions, isSelectedAll, onSelectAll, onSelectItem }: TransactionsTableProps) => {
    

    return (
        <table className="w-full border border-gray-light shadow-xl">
            <thead className="border-b border-gray-light">
                <tr className="flex font-bold text-center">
                    <td className="px-4 py-2 border-x border-gray-light">
                        <input
                            onChange={(e) => onSelectAll(e)}
                            checked={isSelectedAll}
                            type="checkbox"
                            aria-label="check"
                        />
                    </td>
                    <td className="px-4 py-2 border-x border-gray-light w-[160px]">Date</td>
                    <td className="px-4 py-2 border-x border-gray-light flex-auto">Description</td>
                    <td className="px-4 py-2 border-x border-gray-light w-[150px]">Category</td>
                    <td className="px-4 py-2 border-x border-gray-light w-[130px]">Type</td>
                    <td className="px-4 py-2 border-x border-gray-light w-[170px]">Sum</td>
                </tr>
            </thead>
            <tbody>
                {transactions.map(t =>
                    <TransactionsTableItem
                        transaction={t}
                        isSelected={!!selectedTransactions.find(s => s._id === t._id)}
                        onSelect={() => onSelectItem(t._id)}
                        key={t._id}
                    />
                )}
            </tbody>
        </table>
    );
}

export default TransactionsTable;