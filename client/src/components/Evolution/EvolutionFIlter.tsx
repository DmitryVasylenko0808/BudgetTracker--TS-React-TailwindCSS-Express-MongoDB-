import React from "react";
import Select from "../Commons/Select";
import SelectItem from "../Commons/SelectItem";
import { Category } from "../../redux/services/types";

type EvolutionFilterProps = {
    periodType: "yearly" | "monthly",
    category: string,
    categories?: Category[]
    filterValue: boolean,
    onSelectPeriod: (periodType: string) => void,
    onSelectCategory: (selectedCategory: string) => void,
    onHideEmpty: () => void,
    onShowAll: () => void,
};

const EvolutionFilter = ({ periodType, category, categories = [], filterValue, onSelectPeriod, onSelectCategory, onHideEmpty, onShowAll }: EvolutionFilterProps) => {
    const buttonClassName = "w-[120px] py-3 border border-gray-light text-center text-navy-light hover:bg-navy-light/20 hover:text-navy-normal";
    const activeButtonClassName = `${buttonClassName} bg-navy-light/20 text-navy-normal`;

    return (
        <div className="mb-10 flex justify-between items-center">
            <div className="flex gap-x-8 items-end">
                <div className="w-[160px]">
                    <Select title="Period" value={periodType}>
                        <SelectItem onClick={() => onSelectPeriod("yearly")} value="yearly">yearly</SelectItem>
                        <SelectItem onClick={() => onSelectPeriod("monthly")} value="monthly">monthly</SelectItem>
                    </Select>
                </div>
                <div className="w-[160px]">
                    <Select title="Category" value={category}>
                        <SelectItem onClick={() => onSelectCategory("all")} value="all">all</SelectItem>
                        {categories?.map(c => (
                            <SelectItem
                                onClick={() => onSelectCategory(c.title)}
                                value={c.title}
                                key={c._id}
                            >
                                {c.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex">
                    <button
                        onClick={onHideEmpty}
                        className={filterValue ? activeButtonClassName : buttonClassName}
                    >
                        HIDE EMPTY
                    </button>
                    <button
                        onClick={onShowAll}
                        className={!filterValue ? activeButtonClassName : buttonClassName}
                    >
                        SHOW ALL
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EvolutionFilter;