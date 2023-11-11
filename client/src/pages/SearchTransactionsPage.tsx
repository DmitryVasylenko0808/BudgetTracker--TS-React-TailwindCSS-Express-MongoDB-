import React from "react";
import { useParams } from "react-router";
import { useSearchTransactionsQuery } from "../redux/services/transactionApi";
import TransactionsContainer from "../components/Transactions/TransactionsContainer";

const SearchTransactionsPage = () => {
    const { value } = useParams();

    const { data, isLoading } = useSearchTransactionsQuery(value);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2 className="text-xl font-bold">Search results for '{value}'</h2>
            {data 
                ? <TransactionsContainer isSearch={true} data={data} />
                : <div className="">No data</div>
            }
        </>
    );
}

export default SearchTransactionsPage