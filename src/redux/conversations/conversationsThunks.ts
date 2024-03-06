import { searchConversationService } from "@/services/conversations.service"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const searchConversationThunk = createAsyncThunk(
    "conversations/search",
    searchConversationService
)
