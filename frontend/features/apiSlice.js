// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import store from "@/features/store";
import { addQueryParam } from "@/app/utilities/utilities";

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['todos', 'users'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/',
        prepareHeaders: headers => {
            const token = store.getState().user.authToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
        }
    }),
    endpoints: builder => ({
        postCreateUser: builder.mutation({
            query: tokenInformation => ({
                method: 'POST',
                url: 'register/',
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
            invalidatesTags: ['users']
        }),
        getTodos: builder.mutation({
            query: userData => (
                {
                method: 'POST',
                url: `todos/${addQueryParam(userData.paramName, userData.paramValue)}`,
                body: userData,
                }
            ),
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