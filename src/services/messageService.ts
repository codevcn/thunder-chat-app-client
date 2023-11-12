import { getFetchMessages } from "@/apis/messages"

export const fetchMessagesService = async (conversationId: number) => {
    try {
        const { data } = await getFetchMessages(conversationId)
        return data
    } catch (error) {
        throw error
    }
}