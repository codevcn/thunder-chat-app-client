import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUserWithoutPassword } from '@/utils/types'
import { checkAuthThunk } from '../auth/authThunks'

type TAuthState = {
    userInfo: TUserWithoutPassword | null,
}

const initialState: TAuthState = {
    userInfo: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthThunk.fulfilled, (state, action: PayloadAction<TUserWithoutPassword>) => {
                state.userInfo = action.payload
            })
    }
})

export const { } = userSlice.actions