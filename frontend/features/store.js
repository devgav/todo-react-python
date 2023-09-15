import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo/todoSlice'
import { apiSlice } from "@/features/apiSlice";
export default configureStore({
    reducer: {
        todo: todoReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => (getDefaultMiddleware().concat(apiSlice.middleware))
})