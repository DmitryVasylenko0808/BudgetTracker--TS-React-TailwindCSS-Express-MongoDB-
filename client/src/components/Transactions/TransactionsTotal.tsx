import React from "react";
import { CategoryType, Transaction } from "../../redux/services/types";

type TransactionsTotalProps = {
    transactions: Transaction[];
};

const TransactionsTotal = ({ transactions }: TransactionsTotalProps) => {
    const getTotalSum = (type: CategoryType, transaction?: Transaction[]) => {
        let result = 0.00.toString();

        if (transaction) {
            result = transaction
                .filter(t => t.type === type)
                .reduce((acc, curr) => acc += curr.sum, 0)
                .toFixed(2);
        }

        return result;
    };

    const totalIncomes = getTotalSum("Income", transactions);
    const totalOutcomes = getTotalSum("Outcome", transactions);
    const totalResult = (parseFloat(totalIncomes) - parseFloat(totalOutcomes)).toFixed(2);

    return (
        <div className="flex items-center gap-x-2">
            <h3 className="text-lg font-bold">Total:</h3>
            <div className="flex gap-x-3">
                <span className="text-base">
                    Incomes: {totalIncomes},
                </span>
                <span className="text-base">
                    Outcomes: {totalOutcomes},
                </span>
                <span className="text-base">
                    Incomes - Outcomes = {totalResult}
                </span>
            </div>
        </div>
    );
}

export default TransactionsTotal;