import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
       baseUrl: "https://devapi.storygraber.com",
       // baseUrl: "http://localhost:8000",

        prepareHeaders: (headers) => {         
            const access_token = localStorage.getItem('access_token')
  
            if (access_token) {
                headers.set('authorization', `Bearer ${access_token}`)
            }
    
            return headers;
        },
    }),

    refetchOnMountOrArgChange: true,
  
    endpoints: (build) => ({
        getProfile: build.query({
            query:  () => ({
                url: `/api/v1/user/me`,
                method: "GET",

            }),
        }),
        getPronounList: build.query({
            query: () => ({
                url: '/api/v1/user/pronouns',
                method: 'GET'
            })
        }),
        getRaceList: build.query({
            query: () => ({
                url: '/api/v1/user/races',
                method: 'GET'
            })
        }),
        getAgeGroup: build.query({
            query: () => ({
                url: '/api/v1/user/age_groups',
                method: 'GET'
            })
        })


    })
})

export const {

    useGetProfileQuery,
    useGetPronounListQuery,
    useGetRaceListQuery,
    useGetAgeGroupQuery


} = profileApi;