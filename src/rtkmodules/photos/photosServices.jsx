import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const photosApi = createApi({
    reducerPath: 'photosApi',
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
        getPhotos: build.query({
            query:  () => ({
                url: `/api/v1/user/me/pictures`,
                method: "GET",

            }),
        }),


    })
})

export const {

    useGetPhotosQuery

} = photosApi;