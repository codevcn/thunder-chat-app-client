import { useRouter } from "next/navigation"
import { TUseAuthRedirect } from "@/utils/types"

export const useAuthRedirect: TUseAuthRedirect = (url = window.location.search) => {
    const params = new URLSearchParams(url)
    const router = useRouter()

    return () => {
        const redirect = params.get('redirect')
        if (redirect) {
            router.push(redirect, undefined)
        } else {
            router.push('/account', undefined)
        }
    }
}