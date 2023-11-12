import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TConversationCard, TUserWithProfile } from "@/utils/types"
import { searchConversationThunk } from "./conversationsThunks"

// >>> fix this: remove
import { dev_test_values } from "@/lib/test"

type TConversationsState = {
    conversations: TConversationCard[] | null,
    searchResults: TUserWithProfile[] | null,
}

const initialState: TConversationsState = {
    conversations: dev_test_values.conversations,
    searchResults: null,
}

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState: initialState,
    reducers: {
        clearSearchResult: (state, action) => {
            state.searchResults = null
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(searchConversationThunk.fulfilled, (state, action: PayloadAction<TUserWithProfile[]>) => {
                state.searchResults = action.payload
            })
    }
})

export const { clearSearchResult } = conversationsSlice.actions