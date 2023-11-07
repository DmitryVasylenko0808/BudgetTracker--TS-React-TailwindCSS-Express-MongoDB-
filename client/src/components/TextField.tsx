import React from "react";

type TextFieldProps = {
    id: string,
    title: string,
    type?: string,
    value?: string
}
const TextField = ({ id, title, type = "text", value }: TextFieldProps) => {
    return (
        <div className="flex flex-col">
            <label className="" htmlFor={id}>{title}</label>
            <input 
                type={type} 
                className="outline-0 py-2 border-b-4 border-gray-light focus:border-navy-normal" 
                id={id} 
                defaultValue={value} 
            />
        </div>
    );
}

export default TextField;