import { useEffect } from "react"
import { useAuth } from "./auth"
import { EAuthStatuses } from "@/utils/enums"
import { useSocketClient } from "@/contexts/socketContext"

export const useSocketConnection = () => {
    const { authStatus } = useAuth()
    const socketClient = useSocketClient()

    useEffect(() => {
        if (authStatus === EAuthStatuses.AUTHENTICATED) {
            socketClient.connect()
        } else if (authStatus === EAuthStatuses.UNAUTHENTICATED) {
            socketClient.disconnect()
        }

        return () => {}
    }, [authStatus])
}
