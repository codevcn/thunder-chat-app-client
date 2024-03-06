import {
    fetchConversationService,
    startConversationService,
} from "@/services/conversations.service"
import { fetchMessagesService } from "@/services/message.service"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const startConversationThunk = createAsyncThunk("messages/start", startConversationService)

export const fetchConversationThunk = createAsyncThunk(
    "messages/fetchConversation",
    fetchConversationService
)

export const fetchMessagesThunk = createAsyncThunk("messages/fetchMessages", fetchMessagesService)
