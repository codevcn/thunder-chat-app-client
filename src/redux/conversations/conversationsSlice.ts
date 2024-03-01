
// >>> fix this: remove
import { dev_test_values } from "@/lib/test"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { TConversationCard, TUserWithProfile } from "@/utils/types"
import { searchConversationThunk } from "./conversationsThunks"

type TConversationsState = {
    conversations: TConversationCard[] | null,
    searchResults: TUserWithProfile[] | null,
    infoBarIsOpened: boolean
}

const initialState: TConversationsState = {
    conversations: dev_test_values.conversations,
    searchResults: null,
    infoBarIsOpened: false,
}

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: initialState,
    reducers: {
        clearSearchResult: (state, action) => {
            state.searchResults = null
        },
        openInfoBar: (state, action: PayloadAction<boolean>) => {
            state.infoBarIsOpened = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(searchConversationThunk.fulfilled, (state, action: PayloadAction<TUserWithProfile[]>) => {
                state.searchResults = action.payload
            })
    }
})

export const {
    clearSearchResult, openInfoBar,
} = conversationsSlice.actions