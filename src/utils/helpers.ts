import { THE_LAST_CONVERSATION_ID_NAME } from "./constants"

export const storeConversationId = (id: string) => {
    localStorage.setItem(THE_LAST_CONVERSATION_ID_NAME, id)
}

export const getConversationId = () => {
    return localStorage.getItem(THE_LAST_CONVERSATION_ID_NAME)
}