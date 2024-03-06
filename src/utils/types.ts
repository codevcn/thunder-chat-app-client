import { AxiosError } from "axios"

export type TUser = {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date | null
    createdAt: Date
    username: string | null
}

export type TProfile = {
    id: number
    about: string | null
    avatar: string | null
    userId: number
    createdAt: Date
}

export type TUserWithProfile = TUser & { Profile?: Omit<TProfile, "id" | "userId"> | null }

export type TUserWithoutPassword = Omit<TUser, "password">

export type TConversation = {
    id: number
    creatorId: number
    recipientId: number
    createdAt: Date
    lastMsgSentId: number | null
}

export type TMessage = {
    id: number
    content: string
    authorId: number
    conversationId: number
    createdAt: string
}

// Conversation Message Type
export type TConvMessage = TMessage & {
    isNewMsg?: boolean
}

export type TConversationWithMessages = TConversation & { messages: TMessage[] }

export type THttpErrorResBody =
    | {
          name: string
          message: string
          trace: string
          timestamp: string
          isUserException: boolean
      }
    | string

export type TAxiosError = {
    originalError: AxiosError<THttpErrorResBody>
    statusCode: number
    message: string
    isUserError: boolean
    clientMessage: string
}

export type TSuccess = {
    success: boolean // always true
}

export type TRegisterUserParams = {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date
}

export type TLoginUserParams = {
    email: string
    password: string
}

export type TSearchConversationParams = {
    email?: string
    username?: string
    nameOfUser?: string
}

export type TConversationCard = {
    id: number
    avatar: string
    title: string
    subtitle: string
    lastMessageTime: string
    pinIndex: number
}

export type TStartConversationParams = {
    recipientId: number
}

export type TDirectConversation = TConversation & {
    recipient: TUserWithProfile
}
