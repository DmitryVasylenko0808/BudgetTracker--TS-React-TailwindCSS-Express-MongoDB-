import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const empltySplitApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7777/api/",
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: () => ({})
});