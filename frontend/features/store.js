import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo/todoSlice'
import userReducer from './user/userSlice'
import { apiSlice } from "@/features/apiSlice";
export default configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => (getDefaultMiddleware().concat(apiSlice.middleware))
})