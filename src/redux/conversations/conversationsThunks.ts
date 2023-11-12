import { searchConversationService } from "@/services/conversationsService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const searchConversationThunk = createAsyncThunk(
    'conversations/search',
    searchConversationService
)