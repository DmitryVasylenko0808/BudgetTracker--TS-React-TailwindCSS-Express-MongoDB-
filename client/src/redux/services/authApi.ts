import { empltySplitApi } from "./emptySplitApi";

export const authApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        signUpUser: builder.mutation<any, any>({
            query: body => ({
                url: "/auth/signup",
                method: "POST",
                body
            })
        }),
        signInUser: builder.mutation<any, any>({
            query: body => ({
                url: "/auth/signin",
                method: "POST",
                body
            })
        })
    })
});

export const {
    useSignUpUserMutation,
    useSignInUserMutation
} = authApi