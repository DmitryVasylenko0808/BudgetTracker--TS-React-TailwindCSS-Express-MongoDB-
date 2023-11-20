import React from "react";
import { formatDate } from "../../utils/formatDate";
import { useDate } from "../../hooks/date";

type DatePickerProps = {
    id: string,
    title?: string
    value?: string
}

const DatePicker = ({ id, title, value }: DatePickerProps) => {
    const { minYear, maxYear } = useDate();

    return (
        <div className="flex flex-col">
            <label className="" htmlFor="date">{title}</label>
            <input
                type="date"
                className={`outline-0 py-2 border-b-4 border-gray-light focus:border-navy-normal appearance-none`}
                id={id}
                defaultValue={value && formatDate(value, true)}
                aria-label={id}
                min={`${minYear}-01-01`}
                max={`${maxYear}-12-31`}
            />
        </div>
    );
}

export default DatePicker;