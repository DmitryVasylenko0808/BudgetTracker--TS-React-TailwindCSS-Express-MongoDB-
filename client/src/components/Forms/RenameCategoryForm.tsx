import React, { useState } from "react";
import { useRenameCategoryMutation } from "../../redux/services/categoriesApi";
import TextField from "../TextField";
import { Category } from "../../redux/services/types";
import Loader from "../Loader";

type RenameCategoryFormProps = {
    category: Category,
    onCloseModal?: () => void
}

type RenameCategoryFormFields = {
    title: { value: string }
}

const RenameCategoryForm = ({ category, onCloseModal }: RenameCategoryFormProps) => {
    const [error, setError] = useState<any>(null);

    const [renameCategory, { isLoading }] = useRenameCategoryMutation();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & RenameCategoryFormFields;
        const data = {
            id: category._id,
            title: target.title.value
        };

        renameCategory(data).unwrap()
            .then(() => onCloseModal && onCloseModal())
            .catch(err => setError(err.data));
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-y-4">
            <TextField
                id="title"
                title="Title"
                value={category.title}
                isError={error && (error.path === "title" || error.path === "")}
                error={error && error.path === "title" && error.message}
            />
            <button
                type="submit"
                className="h-[52px] flex justify-center items-center bg-navy-light shadow-xl 
                text-lg text-white font-bold tracking-wide 
                hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? <Loader variant="secondary" /> : "Rename Category"}
            </button>
        </form>
    );
}

export default RenameCategoryForm;