import { createSlice } from "@reduxjs/toolkit"
import { checkAuthThunk } from "./auth.thunk"
import { EAuthStatus } from "@/utils/enums"

type TAuthState = {
    authStatus: EAuthStatus
}

const initialState: TAuthState = {
    authStatus: EAuthStatus.UNKNOWN,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthThunk.pending, (state, action) => {
                state.authStatus = EAuthStatus.UNKNOWN
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.authStatus = EAuthStatus.AUTHENTICATED
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.authStatus = EAuthStatus.UNAUTHENTICATED
            })
    },
})

export const {} = authSlice.actions
