import React from "react"
import { HiOutlineX } from "react-icons/hi"

type SnackBarProps = {
    text: string,
    onClose: (() => void) | ((e: React.SyntheticEvent) => void),
}

const SnackBar = ({ text, onClose }: SnackBarProps) => {
    return (
        <div className="w-screen fixed left-0 bottom-5 flex justify-center">
            <div className="z-10 bg-black/75  py-3 px-7 flex items-center gap-x-4 text-gray-light">
                <span className="">{text}</span>
                <button onClick={onClose} className="" aria-label="close">
                    <HiOutlineX size={26} />
                </button>
            </div>
        </div>
    );
}

export default SnackBar;