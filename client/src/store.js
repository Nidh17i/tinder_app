import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.js'
import feedReducer from './features/feedSlice.js'
import friendReducer from './features/friendsSlice.js'
export const store = configureStore({
    reducer:{
        authslice:authReducer,
        feedSlice:feedReducer,
        friendSlice:friendReducer,

    }
})