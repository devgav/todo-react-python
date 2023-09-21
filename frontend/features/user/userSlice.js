import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLoggedIn: false,
        authToken: '',
        refreshToken: ''
    },
    reducers: {
      userLoginState: (state, action) => {
            state.userLoggedIn = action.payload; 
      },
      authTokenUpdate: (state, action) => {
          state.authToken = action.payload;
      },
      refreshTokenUpdate: (state, action) => {
          state.refreshToken = action.payload;
      }  
    }
})

// Action creators are generated for each case reducer function
export const { userLoginState, authTokenUpdate, refreshTokenUpdate } = userSlice.actions

export const userSelector = (state) => state.user.userLoggedIn;

export default userSlice.reducer