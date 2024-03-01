import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { TUserWithoutPassword } from '@/utils/types'
import { checkAuthThunk } from '../auth/authThunks'

type TAuthState = {
    user: TUserWithoutPassword | null,
}

const initialState: TAuthState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<TUserWithoutPassword>) => {
            state.user = action.payload
        })
    }
})

export const { } = userSlice.actions