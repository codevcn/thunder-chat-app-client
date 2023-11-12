import { TUserWithProfile } from '@/utils/types'
import { client_axios } from '@/configs/axios'

const getUserByEmail = (email: string) =>
    client_axios.get<TUserWithProfile>('/user/getUserByEmail?email=' + email)

export {
    getUserByEmail,
}