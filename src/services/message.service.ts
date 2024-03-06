import { getFetchMessages } from "@/apis/messages"

// >>> fix this: remove
import { dev_test_values } from "@/providers/test"

export const fetchMessagesService = async (conversationId: number) => {
    try {
        // const { data } = await getFetchMessages(conversationId)
        // return data
        return await dev_test_values.getTestMessages()
    } catch (error) {
        throw error
    }
}
