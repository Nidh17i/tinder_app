import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:[] ,
    isAuthenticated:false,
};
const authslice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            console.log(action.payload);
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        userLoggedOut:(state)=>{
            state.user=null;
            state.isAuthenticated=false;

        }

    }
})
export const{userLoggedIn,userLoggedOut}=authslice.actions;
export default authslice.reducer;