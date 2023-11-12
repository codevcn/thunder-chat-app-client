import { fetchConversationService, startConversationService } from "@/services/conversationsService"
import { fetchMessagesService } from "@/services/messageService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const startConversationThunk = createAsyncThunk(
    'messages/start',
    startConversationService
)

export const fetchConversationThunk = createAsyncThunk(
    'messages/fetchConversation',
    fetchConversationService,
)

export const fetchMessagesThunk = createAsyncThunk(
    'messages/fetchMessages',
    fetchMessagesService
)