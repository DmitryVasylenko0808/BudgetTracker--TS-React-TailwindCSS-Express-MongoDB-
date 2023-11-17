import React from "react";
import AddTransactionForm from "../components/Forms/TransactionAddForm";

const AddTransactionPage = () => {
    return (
        <>
            <h2 className="mb-2 text-xl tracking-wide font-bold">Add Transaction</h2>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center p-8 w-[460px] border border-gray-light shadow-xl">
                    <AddTransactionForm />
                </div>
            </div>
        </>
    )
}

export default AddTransactionPage;