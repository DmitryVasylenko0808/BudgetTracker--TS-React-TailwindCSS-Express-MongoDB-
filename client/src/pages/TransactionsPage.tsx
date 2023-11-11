import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../components/Select";
import SelectItem from "../components/SelectItem";
import MonthSelect from "../components/Transactions/MonthSelect";
import TransactionsContainer from "../components/Transactions/TransactionsContainer";

const TransactionsPage = () => {
    const minYear = 2020;
    const maxYear = new Date().getFullYear();

    let years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
    };

    const [searchParams, setSearchParams] = useSearchParams();

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
        );
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
        );
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
        );
    };

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
            <TransactionsContainer />
        </>
    );
}

export default TransactionsPage;