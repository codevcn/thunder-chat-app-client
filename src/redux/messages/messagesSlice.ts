import type { TConvMessage, TConversation, TDirectConversation, TMessage, TUserWithProfile } from "@/utils/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchConversationThunk, fetchMessagesThunk, startConversationThunk } from "./messagesThunks"

type TMessagesState = {
    conversation: TConversation | null
    recipient: TUserWithProfile | null,
    messages: TConvMessage[] | null,
    fetchedMsgs: boolean,

}

const initialState: TMessagesState = {
    conversation: null,
    recipient: null,
    messages: null,
    fetchedMsgs: false,
}

export const messagesSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        pushMsg: (state, action: PayloadAction<TConvMessage>) => {
            state.messages?.push(action.payload)
        }
    },
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
            state.fetchedMsgs = true
        })
    }
})

export const { pushMsg } = messagesSlice.actions