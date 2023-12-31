import React, { useState } from "react";
import { useAddCategoryMutation } from "../../redux/services/categoriesApi";
import TextField from "../Commons/TextField";
import Select from "../Commons/Select";
import SelectItem from "../Commons/SelectItem";
import { CategoryType } from "../../redux/services/types";
import Loader from "../Commons/Loader";

type AddCategoryFormProps = {
    onCloseModal?: () => void
}

type AddCategoryFormFields = {
    title: { value: string }
}

const AddCategoryForm = ({ onCloseModal }: AddCategoryFormProps) => {
    const [error, setError] = useState<any>(null);
    const [type, setType] = useState<CategoryType>("Outcome");

    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & AddCategoryFormFields;
        const data = {
            title: target.title.value,
            type
        };

        addCategory(data).unwrap()
            .then(() => onCloseModal && onCloseModal())
            .catch(err => setError(err.data));
    }

    const handleClickType = (type: CategoryType) => setType(type);

    return (
        <form onSubmit={handleSubmit} className="w-[400px] flex flex-col gap-y-4">
            <TextField
                id="title"
                title="Title"
                isError={error && (error.path === "title" || error.path === "")}
                error={error && error.path === "title" && error.message}
            />

            <Select title="Type" value={type}>
                <SelectItem onClick={() => handleClickType("Income")} value="Income">Income</SelectItem>
                <SelectItem onClick={() => handleClickType("Outcome")} value="Outcome">Outcome</SelectItem>
            </Select>

            <button
                type="submit"
                className="h-[52px] flex justify-center items-center bg-navy-light shadow-xl 
                text-lg text-white font-bold tracking-wide 
                hover:bg-navy-normal disabled:opacity-60 disabled:hover:bg-navy-light"
                disabled={isLoading}
            >
                {isLoading ? <Loader variant="secondary" /> : "Add Category"}
            </button>
        </form>
    );
}

export default AddCategoryForm;