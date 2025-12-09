

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,   
};

const authslice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    finishLoading: (state) => {  
      state.loading=false
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut, finishLoading } = authslice.actions;
export default authslice.reducer;
