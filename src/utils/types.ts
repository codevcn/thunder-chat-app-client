import { AxiosError } from "axios"

export type TUser = {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: string
    createdAt: Date
}

export type THttpErrorResBody = {
    name: string,
    message: string,
    trace: string,
    timestamp: Date,
    isUserException: boolean,
}

export type TAxiosError = {
    originalError: AxiosError<THttpErrorResBody>
    statusCode: number
    message: string
    isUserError: boolean
    clientMessage: string
}

export type TSuccess = {
    success: boolean //true
}

export type TRegisterUserData = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: Date,
}

export type TLoginUserData = {
    email: string,
    password: string,
}

export type TToast = {
    success: () => void,
    error: () => void,
    warning: () => void,
}

export type TToastHanlder = (message: string) => TToast

export type TUseAuthRedirect = ((url?: string) => (() => void))