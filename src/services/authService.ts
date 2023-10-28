import { postCheckAuth } from "@/apis/auth"

const checkAuthService = async () => {
    try {
        const { data } = await postCheckAuth()
        return data
    } catch (error) {
        throw error
    }
}

export {
    checkAuthService,
}