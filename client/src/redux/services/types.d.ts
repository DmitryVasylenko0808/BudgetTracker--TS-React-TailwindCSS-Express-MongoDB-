/* ------------------ */
/*        USERS       */
/* ------------------ */

export type User = {
    _id: string,
    login: string,
    sum: number
};

export type RegisterRequest = {
    login: string,
    password: string,
    password_confirm: string
};

export type LoginRequest = {
    login: string,
    password: string,
};

export type LoginResponse = User & { token: string };

/* ------------------ */
/*     CATEGORIES     */
/* ------------------ */

export type CategoryType = "Income" | "Outcome";

export type Category = {
    _id: string,
    title: string,
    type: CategoryType
};

export type AddCategoryRequest = {
    title: string,
    type: CategoryType
};

export type RenameCategoryRequest = {
    id: string,
    title: string
};

/* -------------------- */
/*     TRANSACTIONS     */
/* -------------------- */

export type Transaction = {
    _id: string,
    date: Date | null,
    description: string,
    category: Omit<Category, "type">,
    type: CategoryType,
    sum: number
};

export type GetTransactionRequest = {
    year: string,
    month: string,
    type: CategoryType | "all",
    category: string | "all"
};

export type AddTransactionRequest = {
    date: Date | null,
    description: string,
    category: string,
    type: CategoryType,
    sum: number
};

export type EditTransactionRequest = AddTransactionRequest & { id: string };

export type DeleteTransactionsRequest = {
    ids: string[]
};