import { AxiosRequestConfig } from "axios"
import type { TSuccess, TUserWithoutPassword } from "@/utils/types"
import type { TLoginUserParams, TRegisterUserParams } from "@/utils/types"
import { client_axios } from "@/configs/axios"

const request_config: AxiosRequestConfig = {
    withCredentials: true,
}

const postRegisterUser = (data: TRegisterUserParams) =>
    client_axios.post<TSuccess>("/auth/register", data, request_config)

const postLoginUser = (data: TLoginUserParams) =>
    client_axios.post<TSuccess>("/auth/login", data, request_config)

const postCheckAuth = () =>
    client_axios.post<TUserWithoutPassword>("/auth/checkAuth", {}, request_config)

export { postRegisterUser, postLoginUser, postCheckAuth }
