import React from "react";
import { HiOutlineX } from "react-icons/hi";

type ModalProps = {
    isOpen: boolean
    children: React.ReactNode,
    onClose: () => void
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
    const hiddenClassName = !isOpen ? "hidden" : "";
    
    return (
        <div className={`${hiddenClassName} w-full h-screen flex items-center justify-center fixed top-0 left-0 z-20 bg-black/30`}>
            <div className="p-10 relative bg-white border border-gray-light shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-5 text-gray-strength hover:text-black" aria-label="close" >
                    <HiOutlineX size={36} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;