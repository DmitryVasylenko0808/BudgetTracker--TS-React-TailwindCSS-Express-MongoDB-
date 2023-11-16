import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const listvariants = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: -10,
        opacity: 0
    }
}

type SelectProps = {
    title?: string,
    value?: string | number | null,
    children: React.ReactNode
}

const Select = ({ title, value, children }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(false);
    }, [value]);

    const handleToggleSelect = () => setIsOpen(!isOpen);

    const openClassName = isOpen ? "border-navy-normal" : "";
    const iconRotateClassName = isOpen ? "rotate-180" : "";

    return (
        <div className="relative">
            <div className="flex flex-col">
                <label>{title}</label>
                <div
                    onClick={handleToggleSelect}
                    className={`flex justify-between items-center py-2 border-b-4 border-gray-light cursor-pointer ${openClassName}`}
                >
                    <span className="">{value}</span>
                    <HiChevronDown size={26} className={`text-navy-strength ${iconRotateClassName}`} />
                </div>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.ul 
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={listvariants}
                        transition={{ duration: 0.2 }}
                        className="w-full max-h-[290px] absolute bg-white top-17 left-0 z-10 border-x border-b border-gray-light overflow-y-auto"
                    >
                        {children}
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    );
}

export default Select;