import React from "react";

type DatePickerProps = {
    id: string,
    title?: string
    value?: string
}

const DatePicker = ({ id, title, value }: DatePickerProps) => {
    let formated: string[] | string = "";
    if (value) {
        formated = value.split(/-|T|:/);
        formated = `${formated[0]}-${formated[1]}-${formated[2]}`;
    }

    return (
        <div className="flex flex-col">
            <label className="" htmlFor="date">{title}</label>
            <input
                type="date"
                className={`outline-0 py-2 border-b-4 border-gray-light focus:border-navy-normal appearance-none`}
                id={id}
                defaultValue={value && formated}
                aria-label={id}
            />
        </div>
    );
}

export default DatePicker;