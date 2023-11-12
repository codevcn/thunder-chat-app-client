import { client_axios } from "@/configs/axios"
import { TMessage } from "@/utils/types"
import { AxiosRequestConfig } from "axios"

const request_config: AxiosRequestConfig = {
    withCredentials: true,
}

export const getFetchMessages = (conversationId: number) =>
    client_axios.get<TMessage[]>('/message/fetch/' + conversationId, request_config)
