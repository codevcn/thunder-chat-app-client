import { createContext, useContext } from "react"
import { io } from "socket.io-client"

export const socketClient = io(process.env.NEXT_PUBLIC_SERVER_HOST!, {
    autoConnect: false,
    withCredentials: true,
})

export const SocketClientContext = createContext(socketClient)

export const useSocketClient = () => useContext(SocketClientContext)
