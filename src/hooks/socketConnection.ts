import { useEffect } from "react"
import { useAuth } from "./auth"
import { EAuthStatus } from "@/utils/enums"
import { useSocketClient } from "@/contexts/socketContext"

export const useSocketConnection = () => {
    const { authStatus } = useAuth()
    const socketClient = useSocketClient()

    useEffect(() => {
        if (authStatus === EAuthStatus.AUTHENTICATED) {
            socketClient.connect()
        } else if (authStatus === EAuthStatus.UNAUTHENTICATED) {
            socketClient.disconnect()
        }

        return () => {}
    }, [authStatus])
}
