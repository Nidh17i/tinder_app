import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeduser: [],
};

const feedslice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    friendList: (state, action) => {
      //console.log('payload',action.payload);
      state.feeduser = action.payload;
    },
  },
});
export const { friendList } = feedslice.actions;
export default feedslice.reducer;

