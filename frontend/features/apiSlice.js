// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['todos', 'users'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: builder => ({
        postCreateUser: builder.mutation({
            query: tokenInformation => ({
                method: 'POST',
                url: 'api/register/',
                body: tokenInformation,
            }),
            providesTags: ['users']
        }),
        postLoginUser: builder.mutation({
            query: userData => ({
                method: 'POST',
                url: 'api/token/',
                body: userData,
            }),
            providesTags: ['users']
        }),
        postRefreshToken: builder.mutation({
            query: userData => ({
                method: 'POST',
                url: 'api/token/refresh/',
                body: userData,
            }),
            providesTags: ['users']
        }),
        getTodos: builder.mutation({
            query: userData => ({
                method: 'POST',
                url: 'api/token/',
                body: userData,
                prepareHeaders: (headers) => {
                    headers.set('Authorization', userData)
                    return headers;
                }
            }),
            providesTags: ['users']
        }),
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { 
    usePostCreateUserMutation,
    usePostLoginUserMutation,
    usePostRefreshTokenMutation,
    useGetTodosMutation,
} = apiSlice