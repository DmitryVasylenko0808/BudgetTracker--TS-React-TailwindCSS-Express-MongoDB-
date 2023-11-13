import { empltySplitApi } from "./emptySplitApi";
import { GetEvolutionRequest, GetReportsRequest, ReportCategory, Statistic } from "./types";

export const statiscticsApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        getReports: builder.query<ReportCategory[], GetReportsRequest>({
            query: ({ year, type }) => `statistics/reports/${year}/${type}`,
            providesTags: ["Transactions", "Categories"]
        }),
        getEvolution: builder.query<Statistic[], GetEvolutionRequest>({
            query: ({ type, periodType, category }) => `/statistics/evolution/${type}/${periodType}/${category}`,
            providesTags: ["Transactions", "Categories"]
        })
    })
});

export const {
    useGetReportsQuery,
    useGetEvolutionQuery
} = statiscticsApi;