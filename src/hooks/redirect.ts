import { useRouter, usePathname } from "next/navigation"
import type { TUseAuthRedirect } from "@/utils/types"

export const useAuthRedirect: TUseAuthRedirect = ({ refresh }) => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect') || '/account'
    const router = useRouter()
    return () => {
        if (refresh) {
            window.open(redirect)
        } else {
            router.push(redirect)
        }
    }
}

export const useRedirectToLogin = () => {
    const pathname = usePathname()
    const router = useRouter()
    return () => {
        const redirect = `/loginSignUp?redirect=${pathname}`
        router.push(redirect)
    }
}