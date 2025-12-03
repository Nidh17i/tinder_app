import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/features/authSlice.js'
import feedReducer from '../src/features/feedSlice.js'
import friendReducer from '../src/features/friendsSlice.js'
export const store = configureStore({
    reducer:{
        authslice:authReducer,
        feedSlice:feedReducer,
        friendSlice:friendReducer,

    }
})