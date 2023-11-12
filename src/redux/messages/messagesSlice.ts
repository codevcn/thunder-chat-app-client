import { TConversation, TDirectConversation, TMessage, TUserWithProfile } from "@/utils/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchConversationThunk, fetchMessagesThunk, startConversationThunk } from "./messagesThunks"

// >>> fix this: remove
import { dev_test_values } from "@/lib/test"

type TMessagesState = {
    conversation: TConversation | null
    recipient: TUserWithProfile | null,
    messages: TMessage[] | null,
}

const initialState: TMessagesState = {
    conversation: null,
    recipient: null,
    messages: dev_test_values.messages,
}

export const messagesSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startConversationThunk.fulfilled, (state, action: PayloadAction<TDirectConversation>) => {
            const {
                recipient,
                ...conversation
            } = action.payload

            state.conversation = conversation
            state.recipient = recipient
        })
        builder.addCase(fetchConversationThunk.fulfilled, (state, action: PayloadAction<TDirectConversation>) => {
            const {
                recipient,
                ...conversation
            } = action.payload

            state.conversation = conversation
            state.recipient = recipient
        })
        builder.addCase(fetchMessagesThunk.fulfilled, (state, action: PayloadAction<TMessage[]>) => {
            const messages = action.payload
            state.messages = messages
        })
    }
})

export const { } = messagesSlice.actions