import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from "react-icons/md";
import Select from "../Select";
import SelectItem from "../SelectItem";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import { useSearchParams } from "react-router-dom";
import { CategoryType } from "../../redux/services/types";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}

const TransactionFilter = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const type = searchParams.get("type");
    const category = searchParams.get("category");

    const { data: categories } = useGetCategoriesQuery();

    const handleSelectType = (type: CategoryType | "all") => {
        setSearchParams({
            year: searchParams.get("year") as string,
            month: searchParams.get("month") as string,
            type: type as string,
            category: searchParams.get("category") as string 
        }) //
    }

    const handleSelectCategory = (category: string) => {
        setSearchParams({
            year: searchParams.get("year") as string,
            month: searchParams.get("month") as string,
            type: searchParams.get("type") as string,
            category
        }) 
    }

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    const isFiltering = type !== "all" || category !== "all";

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="p-2 text-navy-light hover:bg-navy-light/20 hover:text-navy-normal
                disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-navy-light"
                aria-label="filter"
            >
                {isFiltering 
                    ? <MdOutlineFilterAltOff size={30} /> 
                    : <MdOutlineFilterAlt size={30} />
                }
            </button>

            <AnimatePresence>
                {isOpen &&
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={variants}
                        transition={{ duration: 0.15 }}
                        className="py-2 px-4 absolute top-10 right-0 z-10 bg-white border border-gray-light shadow-xl"
                    >
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-bold">Filter</span>
                            <button
                                onClick={handleClose}
                                className="text-gray-strength hover:text-black"
                                aria-label="close"
                            >
                                <HiOutlineX size={30} />
                            </button>
                        </div>

                        <div className="w-[360px] flex gap-x-8">
                            <div className="flex-1">
                                <Select title="Type" value={type}>
                                    <SelectItem onClick={() => handleSelectType("all")} value="All">All</SelectItem>
                                    <SelectItem onClick={() => handleSelectType("Income")} value="Income">Income</SelectItem>
                                    <SelectItem onClick={() => handleSelectType("Outcome")} value="Outcome">Outcome</SelectItem>
                                </Select>
                            </div>
                            <div className="flex-1">
                                <Select title="Category" value={category}>
                                    <SelectItem onClick={() => handleSelectCategory("all")} value="All">All</SelectItem>
                                    {categories?.map(c => 
                                        <SelectItem 
                                            onClick={() => handleSelectCategory(c.title)} 
                                            value={c.title} 
                                            key={c._id}
                                        >
                                            {c.title}
                                        </SelectItem>
                                    )}
                                </Select>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default TransactionFilter;