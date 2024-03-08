import { useEffect } from "react"
import { EAuthStatus, ESocketEventNames } from "@/utils/enums"
import { useSocketChatting } from "@/contexts/socket.context"
import { useAuthStatus } from "@/contexts/auth.context"
import toast from "react-hot-toast"

export const useSocketConnection = () => {
    const authStatus = useAuthStatus()
    const socketClient = useSocketChatting()

    useEffect(() => {
        if (authStatus === EAuthStatus.AUTHENTICATED) {
            socketClient.connect()
        } else if (authStatus === EAuthStatus.UNAUTHENTICATED) {
            socketClient.disconnect()
        }

        socketClient.on(ESocketEventNames.client_connected, () => {
            console.log(">>> Socket connected to server")
        })

        socketClient.on(ESocketEventNames.connect_error, (error) => {
            console.log(">>> Socket is fail to connect to server >>>", error)
            toast.error("Something went wrong! Can't connect to Server")
        })

        return () => {
            socketClient.off(ESocketEventNames.client_connected, () => {})
        }
    }, [authStatus])
}
