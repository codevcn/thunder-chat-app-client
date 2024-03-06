import { useEffect } from "react"
import { EAuthStatus, ESocketEventNames } from "@/utils/enums"
import { useSocketChatting } from "@/contexts/socket.context"
import { useAuthStatus } from "@/contexts/auth.context"

export const useSocketConnection = () => {
    const authStatus = useAuthStatus()
    const socketClient = useSocketChatting()

    socketClient.on(ESocketEventNames.client_connected, () => {
        console.log(">>> Socket connected to server")
    })

    socketClient.on(ESocketEventNames.connect_error, (error) => {
        console.log(">>> Socket is fail to connect to server >>>", error)
    })

    useEffect(() => {
        if (authStatus === EAuthStatus.AUTHENTICATED) {
            socketClient.connect()
        } else if (authStatus === EAuthStatus.UNAUTHENTICATED) {
            socketClient.disconnect()
        }

        return () => {
            socketClient.off(ESocketEventNames.client_connected, () => {})
        }
    }, [authStatus])
}
