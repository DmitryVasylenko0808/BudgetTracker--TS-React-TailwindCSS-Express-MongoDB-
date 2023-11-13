import React from "react";

type CheckBoxProps = {
    isChecked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const CheckBox = ({ isChecked, onChange }: CheckBoxProps) => {
    const checkedClassName = isChecked ? "bg-navy-normal border-navy-normal" : "";

    return (
        <label className="relative block">
            <input
                onChange={(e) => onChange(e)}
                checked={isChecked}
                type="checkbox"
                aria-label="check"
                className="absolute w-0 h-0 opacity-0 hidden"
            />
            <div className={`relative w-[24px] h-[24px] border border-gray-strength rounded-[4px] ${checkedClassName}`}>
                {isChecked && <div className="absolute top-[4px] left-[5px] w-[12px] h-[8px] border-l-2 border-b-2 border-white rotate-[-45deg]"></div>}
            </div>
        </label>
    );
}

export default CheckBox;