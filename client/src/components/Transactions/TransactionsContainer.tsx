import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryType, Transaction } from "../../redux/services/types";
import { useDeleteTransactionsMutation, useGetTransactionQuery } from "../../redux/services/transactionApi";
import TransactionsMenu from "./TransactionsMenu";
import Modal from "../Modal";
import AddTransactionForm from "../Forms/TransactionAddForm";
import EditTransactionForm from "../Forms/EditTransactionForm";
import TransactionsTable from "./TransactionsTable";
import TransactionsTotal from "./TransactionsTotal";

type TransactionsContainerProps = {
    data: Transaction[],
    isSearch?: boolean
}

const TransactionsContainer = ({ data, isSearch = false }: TransactionsContainerProps) => {
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
    const [isEditOpen, setIsOpenEdit] = useState<boolean>(false);
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
    const [searchParams] = useSearchParams();

    const year = searchParams.get("year") as string;
    const month = searchParams.get("month") as string;

    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ]; 
    const fullMonth = months[parseFloat(month) - 1]; //

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
            .finally(() => setSelectedTransactions([])) //
    }

    return (
        <>
            <div className="mb-8 flex justify-between items-center">
                {!isSearch && <h2 className="text-xl font-bold">{fullMonth} {year}</h2>}
                <TransactionsTotal 
                    transactions={selectedTransactions.length 
                        ? selectedTransactions 
                        : data as Transaction[]
                    } 
                />
                <TransactionsMenu
                    isRemovedAdd={isSearch}
                    isDisabledEdit={!selectedTransactions.length || selectedTransactions.length > 1}
                    isDisabledDelete={!selectedTransactions.length}
                    onAdd={handleOpenAddModal}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTransactions}
                />
            </div>

            {data && data?.length
                ? <TransactionsTable
                    transactions={data}
                    selectedTransactions={selectedTransactions}
                    isSelectedAll={selectedTransactions.length === data?.length}
                    onSelectAll={handleSelectAllTransactions}
                    onSelectItem={handleSelectTransaction}
                  />
                : <h3 className="text-center text-gray-strength font-bold">No data</h3>
            }

            <Modal isOpen={isOpenAdd} onClose={handeCloseAddModal}>
                <AddTransactionForm onCloseModal={handeCloseAddModal} />
            </Modal>

            <Modal isOpen={!!selectedTransactions.length && isEditOpen} onClose={handeCloseEditModal}>
                {selectedTransactions.length && 
                    <EditTransactionForm
                        transaction={selectedTransactions[0]}
                        onCloseModal={handeCloseEditModal}
                    />
                }
            </Modal>
        </>
    );
}

export default TransactionsContainer;