import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/redux/auth/authSlice'
import { userSlice } from './user/userSlice'

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [userSlice.name]: userSlice.reducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch