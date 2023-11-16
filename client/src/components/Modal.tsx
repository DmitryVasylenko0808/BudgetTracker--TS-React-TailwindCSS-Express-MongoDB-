import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    visible: {
        opacity: 1,
        scale: 1
    },
    hidden: {
        opacity: 0,
        scale: 2
    }
}

type ModalProps = {
    isOpen: boolean
    children: React.ReactNode,
    onClose: () => void
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
    if (!isOpen) {
        return null;
    };

    return (
        <AnimatePresence>
            <div className={`w-full h-screen flex items-center justify-center fixed top-0 left-0 z-20 bg-black/30`}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    transition={{ duration: 0.15, type: "tween" }}
                    className="p-10 relative bg-white border border-gray-light shadow-xl"
                >
                    <button onClick={onClose} className="absolute top-4 right-5 text-gray-strength hover:text-black" aria-label="close" >
                        <HiOutlineX size={36} />
                    </button>
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default Modal;