import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryType, Transaction } from "../../redux/services/types";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import { useDeleteTransactionsMutation, useGetTransactionQuery } from "../../redux/services/transactionApi";
import TransactionsTableItem from "./TransactionTableItem";
import TransactionsMenu from "./TransactionsMenu";
import Modal from "../Modal";
import AddTransactionForm from "../Forms/TransactionAddForm";
import EditTransactionForm from "../Forms/EditTransactionForm";
import TransactionsTable from "./TransactionsTable";
import TransactionsTotal from "./TransactionsTotal";

const TransactionsContainer = () => {
    const [isOpenAdd, setIsOpenAdd] = useState<Boolean>(false);
    const [isEditOpen, setIsOpenEdit] = useState<boolean>(false);
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
    const [searchParams] = useSearchParams();

    const year = searchParams.get("year") as string;
    const month = searchParams.get("month") as string;
    const type: CategoryType | "all" = searchParams.get("type") as CategoryType | "all";
    const category: string | "all" = searchParams.get("category") as string | "all";

    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ]; 
    const fullMonth = months[parseFloat(month) - 1]; //

    const { data, isLoading } = useGetTransactionQuery({ year, month, type: type, category: category });
    const [deleteTransactions] = useDeleteTransactionsMutation();

    useEffect(() => {
        setSelectedTransactions([]);
    }, [data]);

    const handleOpenAddModal = () => setIsOpenAdd(true);
    const handeCloseAddModal = () => setIsOpenAdd(false);
    const handleOpenEditModal = () => setIsOpenEdit(true);
    const handeCloseEditModal = () => {
        setIsOpenEdit(false);
        setSelectedTransactions([]);
    };

    const handleSelectTransaction = (id: string) => {
        const transaction = data?.find(t => t._id === id);

        if (transaction) {
            if (selectedTransactions.find(t => transaction._id === t._id)) {
                const newTransactions = selectedTransactions.filter(s => s._id !== transaction._id)
                setSelectedTransactions(newTransactions);
            } else {
                setSelectedTransactions([...selectedTransactions, transaction])
            }
        }
    }

    const handleSelectAllTransactions = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (data) {
            e.target.checked
                ? setSelectedTransactions(data)
                : setSelectedTransactions([]);
        }
    }

    const handleDeleteTransactions = () => {
        const ids = selectedTransactions.map(t => t._id);

        deleteTransactions({ ids })
            .unwrap()
            .then(() => { })
            .catch(err => { })
            .finally(() => setSelectedTransactions([]))
    }

    

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-xl font-bold">{fullMonth} {year}</h2>
                <TransactionsTotal 
                    transactions={selectedTransactions.length 
                        ? selectedTransactions 
                        : data as Transaction[]
                    } 
                />
                <TransactionsMenu
                    isDisabledEdit={!selectedTransactions.length || selectedTransactions.length > 1}
                    isDisabledDelete={!selectedTransactions.length}
                    onAdd={handleOpenAddModal}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTransactions}
                />
            </div>

            {data?.length
                ? <TransactionsTable
                    isSelectedAll={selectedTransactions.length === data?.length}
                    onSelectAll={handleSelectAllTransactions}
                >
                    {data?.map(t =>
                        <TransactionsTableItem
                            transaction={t}
                            isSelected={!!selectedTransactions.find(s => s._id === t._id)}
                            onSelect={() => handleSelectTransaction(t._id)}
                            key={t._id}
                        />
                    )}
                </TransactionsTable>

                : <div className="">No data</div>
            }

            {isOpenAdd &&
                <Modal onClose={handeCloseAddModal}>
                    <AddTransactionForm onCloseModal={handeCloseAddModal} />
                </Modal>
            }

            {isEditOpen &&
                <Modal onClose={handeCloseEditModal}>
                    <EditTransactionForm
                        transaction={selectedTransactions[0]}
                        onCloseModal={handeCloseEditModal}
                    />
                </Modal>
            }
        </>
    );
}

export default TransactionsContainer;