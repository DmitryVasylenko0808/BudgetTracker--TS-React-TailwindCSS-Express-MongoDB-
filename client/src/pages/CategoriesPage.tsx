import React, { useEffect, useState } from "react";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../redux/services/categoriesApi";
import MenuCategories from "../components/Categories/MenuCategories";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/Forms/AddCategoryForm";
import CategoryItem from "../components/Categories/Category";
import RenameCategoryForm from "../components/Forms/RenameCategoryForm";
import Select from "../components/Select";
import SelectItem from "../components/SelectItem";
import { Category, CategoryType } from "../redux/services/types";

const CategoriesPage = () => {
    const [typeFilter, setTypeFilter] = useState<CategoryType>("Outcome");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>({} as Category);
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [isRenameOpen, setIsRenameOpen] = useState<boolean>(false);

    const { data, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        if (data) {
            setCategories(data.filter(category => category.type === typeFilter));
        }
    }, [data, typeFilter]);

    const handleFilterCategories = (type: "Income" | "Outcome") => setTypeFilter(type);

    const handleSelectCategory = (id: string) => {
        const selected = categories.find(c => c._id === id);

        if (selected) {
            if (selected._id === selectedCategory._id) {
                setSelectedCategory({} as Category);
            } else {
                setSelectedCategory(selected);
            }
        }
    }

    const handleDeleteCategory = () => {
        deleteCategory(selectedCategory._id)
            .unwrap()
            .catch(err => alert(err.data.message));
    }

    const handleOpenAddModal = () => setIsAddOpen(true);
    const handleCloseAddModal = () => setIsAddOpen(false);
    const handleOpenRenameModal = () => setIsRenameOpen(true);
    const handleCloseRenameModal = () => setIsRenameOpen(false);


    if (isCategoriesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="mb-2 text-xl tracking-wide font-bold">Categories</h2>
            {data && <p className="mb-6 text-lg">There are {data.length} categories for transactions</p>}

            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center p-8 w-[460px] border border-gray-light shadow-xl">
                    <MenuCategories 
                        isSelectedCategory={!!Object.keys(selectedCategory).length} 
                        onRename={handleOpenRenameModal} 
                        onDelete={handleDeleteCategory}
                    >
                        <Select value={typeFilter}>
                            <SelectItem onClick={() => handleFilterCategories("Income")} value="Income">Income</SelectItem>
                            <SelectItem onClick={() => handleFilterCategories("Outcome")} value="Outcome">Outcome</SelectItem>
                        </Select>
                    </MenuCategories>
                    <ul className="w-full mb-8 py-2 flex flex-col border-b-4 border-gray-light">
                        {categories.map(category =>
                            <CategoryItem
                                category={category}
                                isSelected={category._id === selectedCategory._id}
                                onSelect={() => handleSelectCategory(category._id)}
                                key={category._id}
                            />
                        )}
                    </ul>
                    <div className="w-full flex justify-end">
                        <button onClick={handleOpenAddModal} className="w-[140px] py-2 bg-navy-light shadow-xl text-lg text-white font-bold hover:bg-navy-normal">ADD</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isAddOpen} onClose={handleCloseAddModal}>
                <AddCategoryForm onCloseModal={handleCloseAddModal} />
            </Modal>

            <Modal isOpen={isRenameOpen} onClose={handleCloseRenameModal}>
                <RenameCategoryForm category={selectedCategory} onCloseModal={handleCloseRenameModal} />
            </Modal>
        </div>
    );
}

export default CategoriesPage;