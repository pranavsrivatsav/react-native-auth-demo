import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    authToken: null,
    userEmail: null
  },
  reducers: {
    signInUser: (state, action) => {
      state.isLoggedIn = true;
      state.authToken = action.payload.token;
      state.userEmail = action.payload.email;
    },
    signOutUser: (state) => {
      state.isLoggedIn = false;
      state.authToken = null,
      state.userEmail = null
    }
  }
});

export const signInUser = authenticationSlice.actions.signInUser;
export const signOutUser = authenticationSlice.actions.signOutUser

export default authenticationSlice.reducer;