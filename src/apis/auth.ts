import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { TSuccess, TUser } from '@/utils/types'
import { TLoginUserData, TRegisterUserData } from '@/utils/types'
import { client_axios } from '@/configs/axios'

const request_config: AxiosRequestConfig = {
    withCredentials: true,
}

const postRegisterUser = (data: TRegisterUserData) =>
    client_axios.post<TSuccess, AxiosResponse<TSuccess>, TRegisterUserData>('/auth/register', data, request_config)

const postLoginUser = (data: TLoginUserData) =>
    client_axios.post<TSuccess, AxiosResponse<TSuccess>, TLoginUserData>('/auth/login', data, request_config)

const postCheckAuth = () =>
    client_axios.post<TUser>('/auth/checkAuth', {}, request_config)

export {
    postRegisterUser,
    postLoginUser,
    postCheckAuth,
}