import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import TextField from "../TextField";
import Select from "../Select";
import SelectItem from "../SelectItem";
import { Category, CategoryType } from "../../redux/services/types";
import DatePicker from "../DatePicker";
import { useAddTransactionMutation } from "../../redux/services/transactionApi";
import Loader from "../Loader";
import SnackBar from "../SnackBar";
import { AnimatePresence } from "framer-motion";


type AddTransactionFormFields = {
    date: { value: string },
    description: { value: string },
    sum: { value: number }
}

const AddTransactionForm = () => {
    const [error, setError] = useState<any>(null);
    const [type, setType] = useState<CategoryType>("Outcome");
    const [category, setCategory] = useState<Category>({} as Category);
    const [currentCategories, setCurrentCategories] = useState<Category[]>([]);
    const [isShown, setIsShown] = useState<boolean>(false);

    const { data: categories } = useGetCategoriesQuery();
    const [addTransaction, { isLoading }] = useAddTransactionMutation();

    let timeoutId: NodeJS.Timeout;

    useEffect(() => {
        if (categories) {
            setCurrentCategories(categories?.filter(c => c.type));
            setCategory(categories[0]);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [categories]);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & AddTransactionFormFields;
        const data = {
            date: new Date(target.date.value),
            description: target.description.value,
            type,
            category: category.title,
            sum: target.sum.value
        }

        addTransaction(data).unwrap()
            .then(() => { 
                setIsShown(true);

                timeoutId = setTimeout(() => {
                    setIsShown(false);
                }, 5000);
             })
            .catch(err => setError(err.data));
    }

    const handleClickType = (type: CategoryType) => {
        setType(type);

        if (categories) {
            setCurrentCategories(categories.filter(c => c.type === type));
        }

        if (category.type !== type) {
            setCategory({} as Category);
        }
    };

    const handleClickCategory = (category: Category) => setCategory(category);

    const handleCloseSnackBar = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsShown(false);
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-y-4">
            <DatePicker id="date" title="Date" />
            <TextField
                id="description"
                title="Description"
                type="textarea"
                isError={error && (error.path === "description" || error.path === "")}
                error={error && error.path === "description" && error.message}
            />
            <div className="mb-[14px] flex gap-x-8">
                <div className="flex-1">
                    <Select title="Type" value={type}>
                        <SelectItem onClick={() => handleClickType("Income")} value="Income">Income</SelectItem>
                        <SelectItem onClick={() => handleClickType("Outcome")} value="Outcome">Outcome</SelectItem>
                    </Select>
                </div>
                <div className="flex-1">
                    <Select title="Category" value={category?.title}>
                        {currentCategories?.map(c =>
                            <SelectItem
                                onClick={() => handleClickCategory(c)}
                                value="Income"
                                key={c._id}
                            >
                                {c.title}
                            </SelectItem>
                        )}
                    </Select>
                </div>
            </div>
            <TextField
                id="sum"
                title="Sum"
                isError={error && (error.path === "sum" || error.path === "")}
                error={error && error.path === "sum" && error.message}
            />

            <button
                type="submit"
                className="h-[52px] flex justify-center items-center bg-navy-light shadow-xl 
                text-lg text-white font-bold tracking-wide 
                hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? <Loader variant="secondary" /> : "Add Transaction"}
            </button>

            <AnimatePresence>
                {isShown &&
                    <SnackBar onClose={handleCloseSnackBar}>
                        The transaction is added
                    </SnackBar>
                }
            </AnimatePresence>
        </form>
    );
}

export default AddTransactionForm;