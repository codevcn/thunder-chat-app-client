import {
    getFetchConversation,
    postSearchConversation,
    postStartConversation,
} from "@/apis/conversations"
import type { TSearchConversationParams, TStartConversationParams } from "@/utils/types"
import { ConversationError } from "@/utils/CustomErrors"
import { EConversationErrMsg } from "@/utils/enums"

export const searchConversationService = async (payload: TSearchConversationParams) => {
    try {
        const { data } = await postSearchConversation(payload)
        return data
    } catch (error) {
        throw error
    }
}

export const startConversationService = async (payload: TStartConversationParams) => {
    try {
        const { data } = await postStartConversation(payload)
        return data
    } catch (error) {
        throw error
    }
}

export const fetchConversationService = async (conversationId: number) => {
    try {
        const { data } = await getFetchConversation(conversationId)

        if (data) return data
        else throw new ConversationError(EConversationErrMsg.CONV_NOT_FOUND)
    } catch (error) {
        throw error
    }
}
