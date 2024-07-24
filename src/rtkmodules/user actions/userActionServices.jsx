import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userActionsApi = createApi({
    reducerPath: 'userActionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://devapi.storygraber.com",
        //baseUrl: "http://localhost:8000",

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

        getLiked: build.query({
            query: () => ({
                url: '/api/v1/user/me/liked',
                method: 'GET'
            })
        }),

        getFavorited: build.query({
            query: () => ({
                url: '/api/v1/user/me/favourites',
                method: 'GET'
            })
        }),
        getViewed: build.query({
            query: () => ({
                url: '/api/v1/user/me/viewed',
                method: 'GET'
            })
        }),

        getIgnored: build.query({
            query: () => ({
                url: '/api/v1/user/me/ignores',
                method: 'GET'
            })
        }),

        getLikedBy: build.query({
            query: () =>  ({
                url: '/api/v1/user/me/liked_by',
                method:'GET'
            })
        }),
        getViewedBy: build.query({
            query: () => ({
                url: '/api/v1/user/me/viewed_by',
                method:'GET'
            })
        }),
        getFavoritedBy: build.query({
            query: () => ({
                url: '/api/v1/user/me/favourited_by',
                method: 'GET'
            })
        })

    })
})

export const {

    useGetLikedQuery,
    useGetFavoritedQuery,
    useGetViewedQuery,
    useGetLikedByQuery,
    useGetViewedByQuery,
    useGetIgnoredQuery,
    useGetFavoritedByQuery


} = userActionsApi;