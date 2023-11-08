import React from "react";

type TextFieldProps = {
    id: string,
    title: string,
    type?: string,
    value?: string,
    isError?: boolean,
    error?: boolean
};

const TextField = ({ id, title, type = "text", value, isError, error }: TextFieldProps) => {
    console.log(error);

    let invalidInputClassname = "";
    if (isError || error) {
        invalidInputClassname = "border-red-600";
    }

    return (
        <div className="flex flex-col">
            <label className="" htmlFor={id}>{title}</label>
            <input 
                type={type} 
                className={`outline-0 py-2 border-b-4 border-gray-light focus:border-navy-normal ${invalidInputClassname}`}
                id={id} 
                defaultValue={value} 
            />
            <span className={`min-h-[14px] text-sm text-red-600`}>{error && error}</span>
        </div>
    );
}

export default TextField;