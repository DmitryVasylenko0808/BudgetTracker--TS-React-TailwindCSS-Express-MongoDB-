import { empltySplitApi } from "./emptySplitApi";
import { GetEvolutionRequest, Statistic } from "./types";

export const statiscticsApi = empltySplitApi.injectEndpoints({
    endpoints: builder => ({
        getEvolution: builder.query<Statistic[], GetEvolutionRequest>({
            query: ({ type, periodType, category }) => `/statistics/evolution/${type}/${periodType}/${category}`,
            providesTags: ["Transactions"]
        })
    })
});

export const {
    useGetEvolutionQuery
} = statiscticsApi;