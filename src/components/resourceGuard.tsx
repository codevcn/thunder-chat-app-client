"use client"

import { useAuth } from "@/hooks/auth"
import { EAuthStatus } from "@/utils/enums"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRedirectToLogin } from "@/hooks/redirect"
import { AppLoading } from "./appLoading"

export const RouteGuard = ({
    children,
    fallback,
}: {
    children: JSX.Element
    fallback?: JSX.Element
}) => {
    const { authStatus } = useAuth()
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

    return fallback || <AppLoading />
}
