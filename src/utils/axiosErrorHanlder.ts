import { AxiosError } from "axios"
import { MAX_LEN_OF_ERROR_MESSAGE } from "./constants"
import { TAxiosError, THttpErrorResBody } from "./types"

class CustomAxiosError {
    originalError: AxiosError<THttpErrorResBody>
    statusCode: number
    message: string
    isUserError: boolean
    clientMessage: string

    constructor(error: AxiosError<THttpErrorResBody>, client_message: string) {
        this.originalError = error
        this.statusCode = 500
        this.message = ''
        this.isUserError = false
        this.clientMessage = client_message
    }

    errorSetting(): void {
        const response_of_error = this.originalError.response

        if (response_of_error) { //if error was made by server at backend

            this.statusCode = response_of_error.status //update error status

            const data_of_response: THttpErrorResBody = response_of_error.data

            this.isUserError = !!data_of_response.isUserException //check if is error due to user or not

            this.message = data_of_response.message //update error message
            if (this.message.length > MAX_LEN_OF_ERROR_MESSAGE) {
                this.message = `${this.message.slice(0, MAX_LEN_OF_ERROR_MESSAGE)}...`
            }

        } else if (this.originalError.request) { //The request was made but no response was received
            this.statusCode = 502
            this.message = 'Bad network or error from server.'
        } else { //Something happened in setting up the request that triggered an Error
            this.message = this.originalError.message
        }
    }
}

const axiosErrorHandler = (
    orginal_error: AxiosError<THttpErrorResBody>,
    client_message = 'Something went wrong, please try again minutes later!'
): TAxiosError => {
    const error = new CustomAxiosError(orginal_error, client_message)

    error.errorSetting()

    return Object.assign({}, error)
}

export default axiosErrorHandler