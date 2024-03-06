"use client"

import { AuthStatusContext } from "@/contexts/auth.context"
import { useAuth } from "@/hooks/auth"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { authStatus } = useAuth()

    return <AuthStatusContext.Provider value={authStatus}>{children}</AuthStatusContext.Provider>
}
