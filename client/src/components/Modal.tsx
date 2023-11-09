import React from "react";
import { HiOutlineX } from "react-icons/hi";

type ModalProps = {
    children: React.ReactNode,
    onClose: () => void
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/30">
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