import { useRouter } from "next/navigation"
import { getPathnameWithQueryString } from "@/utils/url"

export const useAuthRedirect = () => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get("redirect") || "/account"
    const router = useRouter()
    return ({ refresh }: { refresh: boolean }) => {
        if (refresh) {
            window.open(redirect, "_self")
        } else {
            router.push(redirect)
        }
    }
}

export const useRedirectToLogin = () => {
    const router = useRouter()
    return () => {
        const redirect = `/loginSignUp?redirect=${getPathnameWithQueryString()}`
        router.push(redirect)
    }
}
