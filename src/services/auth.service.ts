import { postCheckAuth } from "@/apis/auth"

export const checkAuthService = async () => {
    try {
        const { data } = await postCheckAuth()
        return data
    } catch (error) {
        throw error
    }
}
