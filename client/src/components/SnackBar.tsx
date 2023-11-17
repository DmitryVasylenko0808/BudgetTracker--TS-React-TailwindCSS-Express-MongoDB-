import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { HiOutlineX } from "react-icons/hi"

const variants = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: 10,
        opacity: 0
    }
};

type SnackBarProps = {
    children: React.ReactNode,
    onClose: (() => void) | ((e: React.SyntheticEvent) => void),
}

const SnackBar = ({ children, onClose }: SnackBarProps) => {
    return (
        <div className="w-screen fixed left-0 bottom-5 flex justify-center">
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                className="z-10 bg-black/75 py-3 px-7 flex items-center gap-x-4 text-gray-light"
            >
                {children}
                <button onClick={onClose} className="" aria-label="close">
                    <HiOutlineX size={26} />
                </button>
            </motion.div>
        </div>
    );
}

export default SnackBar;