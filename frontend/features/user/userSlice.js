import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLoggedIn: false
    },
    reducers: {
      userLoginState: (state, action) => {
            state.userLoggedIn = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { userLoginState } = userSlice.actions

export const userSelector = (state) => state.user.userLoggedIn;

export default userSlice.reducer