import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLoggedIn: false
    },
    reducers: {
        updateUser: (state, action) => {
            state.userLoggedIn = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer