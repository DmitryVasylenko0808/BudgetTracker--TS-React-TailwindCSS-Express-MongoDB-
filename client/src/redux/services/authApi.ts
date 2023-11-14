import { empltySplitApi } from "./emptySplitApi";
import { LoginRequest, LoginResponse, RegisterRequest, User } from "./types";

export const authApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        getInfoUser: builder.query<User, null>({
            query: () => "/auth/me",
            providesTags: ["User"]
        }),
        signUpUser: builder.mutation<boolean, RegisterRequest>({
            query: body => ({
                url: "/auth/signup",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
        signInUser: builder.mutation<LoginResponse, LoginRequest>({
            query: body => ({
                url: "/auth/signin",
                method: "POST",
                body
            }),
            invalidatesTags: ["User", "Categories", "Transactions"]
        })
    })
});

export const {
    useGetInfoUserQuery,
    useSignUpUserMutation,
    useSignInUserMutation
} = authApi;