import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const friendSlice = createSlice({
  name: "friendSlice",
  initialState,
  reducers: {
    userFriend: (state, action) => {
      console.log('payload',action.payload);
      state.friends = action.payload;
    },
  },
});
export const { userFriend} = friendSlice.actions;
export default friendSlice.reducer;
