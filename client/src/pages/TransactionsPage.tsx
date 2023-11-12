import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryType } from "../redux/services/types";
import Select from "../components/Select";
import SelectItem from "../components/SelectItem";
import MonthSelect from "../components/Transactions/MonthSelect";
import TransactionsContainer from "../components/Transactions/TransactionsContainer";
import { useGetTransactionQuery } from "../redux/services/transactionApi";

const TransactionsPage = () => {
    const minYear = 2020;
    const maxYear = new Date().getFullYear();

    let years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
    }; //

    const [searchParams, setSearchParams] = useSearchParams();

    const year = searchParams.get("year") as string;
    const month = searchParams.get("month") as string;
    const type: CategoryType | "all" = searchParams.get("type") as CategoryType | "all";
    const category: string | "all" = searchParams.get("category") as string | "all";

    const { data, isLoading } = useGetTransactionQuery({ year, month, type, category });

    useEffect(() => {
        const defaultMonth = 1;

        setSearchParams(
            { 
                year: years[0].toString(), 
                month: defaultMonth.toString(),
                type: "all",
                category: "all" 
            },
            { replace: true }
        ); //
    }, []);

    const handleSelectYear = (year: number) => {
        setSearchParams(
            { 
                year: year.toString(), 
                month: searchParams.get("month") as string,
                type: searchParams.get("type") as string,
                category: searchParams.get("category") as string 
            },
            { replace: true }
        ); //
    };

    const handleSelectMonth = (month: string) => {
        setSearchParams(
            {
                year: searchParams.get("year") as string,
                month,
                type: searchParams.get("type") as string,
                category: searchParams.get("category") as string 
            },
            { replace: true }
        ); //
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="mb-10 flex items-end gap-x-8">
                <div className="w-[150px]">
                    <Select title="Year" value={searchParams.get("year")}>
                        {years.map((y, i) => (
                            <SelectItem
                                onClick={() => handleSelectYear(y)}
                                value={y}
                                key={i}
                            >
                                {y}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <MonthSelect 
                    selectedMonth={parseFloat(searchParams.get("month") as string)} 
                    onSelect={handleSelectMonth}
                />                
            </div>
            {data && <TransactionsContainer data={data} />}
        </>
    );
}

export default TransactionsPage;