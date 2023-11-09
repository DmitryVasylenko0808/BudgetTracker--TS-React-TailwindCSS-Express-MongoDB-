import { empltySplitApi } from "./emptySplitApi";
import { AddCategoryRequest, Category, RenameCategoryRequest } from "./types";

export const categoriesApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/categories/",
            providesTags: ["Categories"]
        }),
        addCategory: builder.mutation<boolean, AddCategoryRequest>({
            query: body => ({
                url: "/categories/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Categories"]
        }),
        renameCategory: builder.mutation<boolean, RenameCategoryRequest>({
            query: ({ id, ...patch }) => ({
                url: `/categories/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["Categories"] 
        }),
        deleteCategory: builder.mutation<boolean, string>({
            query: id => ({
                url: `categories/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
    })
})

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useRenameCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi;