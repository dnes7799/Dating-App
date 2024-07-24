import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const RecommendedUsersApi = createApi({
    reducerPath: 'recommendedUsersApi',
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

    tagTypes: ['like', 'favorite', 'ignore'],
  
    endpoints: (build) => ({
        getRecommendedUsers: build.query({
            query: () => ({
                url: '/api/v1/user/list/wall',
                method: 'GET'
            }),
            providesTags: ['ignore']
        }),
        getUserDetails: build.query({
            query: (params) => ({
                url: `/api/v1/user/${params}`,
                method: 'GET'
            }),
            providesTags: ['like', 'favorite', 'ignore']
        }),
        getOtherUserPhotos: build.query({
            query: (params) => ({
                url: `/api/v1/user/${params}/pictures`,
                method: 'GET'
            })
        }),
        likeUser: build.mutation({
            query: (data) => ({
                url: 'api/v1/user/action/like',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['like']

        }),
        favoriteUser: build.mutation({
            query: (data) => ({
                url: 'api/v1/user/action/favourite',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['favorite']


        }),
        ignoreUser: build.mutation({
            query: (data) => ({
                url: 'api/v1/user/action/ignore',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ignore']


        })  


    })
})

export const {

 useGetRecommendedUsersQuery,
 useGetUserDetailsQuery,
 useGetOtherUserPhotosQuery,
 useLikeUserMutation,
 useFavoriteUserMutation,
 useIgnoreUserMutation,


} = RecommendedUsersApi;