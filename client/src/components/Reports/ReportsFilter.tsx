import { CategoryType } from "../../redux/services/types";
import Select from "../Select";
import SelectItem from "../SelectItem";

type ReportsFilterProps = {
    currentYear: string | number,
    currentType: CategoryType,
    onSelectYear: (year: string | number) => void,
    onSelectType: (type: CategoryType) => void
};

const ReportsFilter = ({ currentYear, currentType, onSelectYear, onSelectType }: ReportsFilterProps) => {
    const minYear = 2020;
    const maxYear = new Date().getFullYear();

    let years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
        years.push(i);
    }; //

    return (
        <div className="mb-10 flex gap-x-8">
            <div className="w-[160px]">
                <Select title="Year" value={currentYear}>
                    {years.map(y => (
                        <SelectItem
                            onClick={() => onSelectYear(y)}
                            value={y}
                            key={y}
                        >
                            {y}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-[160px]">
                <Select title="Type" value={currentType}>
                    <SelectItem onClick={() => onSelectType("Income")} value="Income">Income</SelectItem>
                    <SelectItem onClick={() => onSelectType("Outcome")} value="Outcome">Outcome</SelectItem>
                </Select>
            </div>
        </div>
    )
}

export default ReportsFilter;