import { client_axios } from "@/configs/axios"
import type {
    TSearchConversationParams,
    TStartConversationParams,
    TUserWithProfile,
    TDirectConversation,
} from "@/utils/types"
import { AxiosRequestConfig } from "axios"

const request_config: AxiosRequestConfig = {
    withCredentials: true,
}

export const postSearchConversation = (data: TSearchConversationParams) =>
    client_axios.post<TUserWithProfile[]>("/conversations/search", data, request_config)

export const postStartConversation = (data: TStartConversationParams) =>
    client_axios.post<TDirectConversation>("/conversations/start", data, request_config)

export const getFetchConversation = (id: number) =>
    client_axios.get<TDirectConversation>("/conversations/fetch/" + id, request_config)
