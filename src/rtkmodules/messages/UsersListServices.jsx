import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UsersListServicesApi = createApi({
    reducerPath: 'usersListServicesApi',
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

    tagTypes: ['NewMessage'],

    endpoints: (build) => ({
        getChatRooms: build.query({
            query: () => ({
                url: '/api/v1/messages/chats',
                method: 'GET'
            }),
            providesTags: ['NewMessage']

        }),
        getChatRoomsDetails: build.query({
            query: (roomId) => ({
                url: `/api/v1/messages/chats/head/${roomId}`,
                method: 'GET'
            })

        }),

        getChatHistory: build.query({
            query: (roomId) => ({
                url: `api/v1/messages/chat/${roomId}`,
                method: 'GET',
            })
        }),
        postNewMessage: build.mutation({
            query: (data) => ({
                url: '/api/v1/messages/new',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['NewMessage']
        }),
        getGroupChatRooms: build.query({
            query: () => ({
                url: '/api/v1/messages/groups/chats',
                method: 'GET'
            }),
            providesTags: ['NewMessage']

        }),
    })
})

export const {

    useGetChatRoomsQuery,
    useGetChatRoomsDetailsQuery,
    useGetChatHistoryQuery,
    usePostNewMessageMutation,
    useGetGroupChatRoomsQuery


} = UsersListServicesApi;