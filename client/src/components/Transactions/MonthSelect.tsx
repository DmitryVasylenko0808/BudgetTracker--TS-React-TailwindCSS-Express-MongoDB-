import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDate } from "../../hooks/date";

type MonthSelectProps = {
    selectedMonth: number,
    onSelect: (month: string) => void
}

const MonthSelect = ({ selectedMonth, onSelect }: MonthSelectProps) => {
    const { shortMonths: months } = useDate(); 

    const monthClassName = "flex-1 h-min border border-gray-light text-center hover:bg-navy-light/20 hover:text-navy-normal";
    const activeMonthClassName = `${monthClassName} bg-navy-light/20 text-navy-normal`;

    return (
        <div className="w-[1000px]">
            <ul className="flex">
                {months.map((m, i) =>
                    <li className={(i + 1) === selectedMonth ? activeMonthClassName : monthClassName} key={i}>
                        <button onClick={() => onSelect((i + 1).toString())} className="block w-full py-2">{m}</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default MonthSelect;