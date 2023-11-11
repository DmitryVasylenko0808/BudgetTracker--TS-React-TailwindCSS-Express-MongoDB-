import React from "react";

type TransactionsTableProps = {
    isSelectedAll: boolean,
    children: React.ReactNode,
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TransactionsTable = ({ isSelectedAll, children, onSelectAll }: TransactionsTableProps) => {
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
                {children}
            </tbody>
        </table>
    );
}

export default TransactionsTable;