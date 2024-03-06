"use client"

import { EAuthStatus } from "@/utils/enums"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRedirectToLogin } from "@/hooks/redirect"
import { AppLoading } from "./appLoading"
import { usePathname } from "next/navigation"
import { useAuthStatus } from "@/contexts/auth.context"

const Guard = ({ children }: { children: JSX.Element }) => {
    const authStatus = useAuthStatus()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const redirect_to_login = useRedirectToLogin()

    const checkAuthStatus = () => {
        if (authStatus === EAuthStatus.AUTHENTICATED) {
            setIsAuthenticated(true)
        } else if (authStatus === EAuthStatus.UNAUTHENTICATED) {
            toast.error("Session expires or not an authenticated user!")
            redirect_to_login()
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [authStatus])

    if (isAuthenticated) return children

    return <AppLoading />
}

export const RouteGuard = ({
    children,
    nonGuardRoutes,
}: {
    children: JSX.Element
    nonGuardRoutes: string[]
}) => {
    if (nonGuardRoutes.includes(usePathname())) {
        return children
    }

    return <Guard>{children}</Guard>
}
