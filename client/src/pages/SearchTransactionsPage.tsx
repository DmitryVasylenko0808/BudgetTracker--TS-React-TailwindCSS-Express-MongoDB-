import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSearchTransactionsQuery } from "../redux/services/transactionApi";
import TransactionsContainer from "../components/Transactions/TransactionsContainer";
import { useSearchParams } from "react-router-dom";
import { CategoryType } from "../redux/services/types";
import Loader from "../components/Loader";

const SearchTransactionsPage = () => {
    const { value } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const type: CategoryType | "all" = searchParams.get("type") as CategoryType | "all" || "all"; 
    const category: string = searchParams.get("category") as string || "all"; 

    const { data, isLoading } = useSearchTransactionsQuery({ value, type, category });

    useEffect(() => {
        if (data) {
            setSearchParams({ type, category });
        }
    }, [type, category]);

    if (isLoading) {
        return <Loader variant="primary" />
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