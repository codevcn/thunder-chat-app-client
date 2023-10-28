import { createSlice } from '@reduxjs/toolkit'
import { checkAuthThunk } from './authThunks'
import { EAuthStatuses } from '@/utils/enums'

type TAuthState = {
    authStatus: EAuthStatuses,
}

const initialState: TAuthState = {
    authStatus: EAuthStatuses.UNKNOWN,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthThunk.pending, (state, action) => {
                state.authStatus = EAuthStatuses.UNKNOWN
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.authStatus = EAuthStatuses.AUTHENTICATED
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.authStatus = EAuthStatuses.UNAUTHENTICATED
            })
    }
})

export const { } = authSlice.actions