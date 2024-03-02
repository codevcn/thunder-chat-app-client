import dayjs from "dayjs"
import { THE_LAST_CONVERSATION_ID_NAME } from "./constants"
import { TUser } from "./types"

export const storeConversationId = (id: string) => {
    localStorage.setItem(THE_LAST_CONVERSATION_ID_NAME, id)
}

export const getConversationId = () => {
    return localStorage.getItem(THE_LAST_CONVERSATION_ID_NAME)
}

export const pickFirstLetterOfNameUser = (user: TUser) => {
    return user.firstName[0]
}

export const setLastSeen = (date: string) => {
    return dayjs(date).format("MM/DD/YYYY, h:mm A")
}

export const getFullName = (user: TUser) => {
    return `${user.firstName} ${user.lastName}`
}
