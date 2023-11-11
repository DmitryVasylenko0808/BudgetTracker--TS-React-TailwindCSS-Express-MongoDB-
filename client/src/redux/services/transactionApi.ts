import { empltySplitApi } from "./emptySplitApi";
import { AddTransactionRequest, DeleteTransactionsRequest, EditTransactionRequest, GetTransactionRequest, Transaction } from "./types";

export const transactionsApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        getTransaction: builder.query<Transaction[], GetTransactionRequest>({
            query: ({ year, month, type, category }) => `/transactions/${year}/${month}/${type}/${category}`,
            providesTags: ["Categories", "Transactions"]
        }),
        addTransaction: builder.mutation<boolean, AddTransactionRequest>({
            query: body => ({
                url: `/transactions/`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Transactions"]
        }),
        editTransaction: builder.mutation<boolean, EditTransactionRequest>({
            query: ({ id, ...patch }) => ({
                url: `/transactions/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["Transactions"]
        }),
        deleteTransactions: builder.mutation<boolean, DeleteTransactionsRequest>({
            query: body => ({
                url: "/transactions/",
                method: "DELETE",
                body
            }),
            invalidatesTags: ["Transactions"]
        })
    })
});

export const {
    useGetTransactionQuery,
    useAddTransactionMutation,
    useEditTransactionMutation,
    useDeleteTransactionsMutation
} = transactionsApi;