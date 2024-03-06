import { ESocketNamespaces } from "@/utils/enums"
import { createContext, useContext } from "react"
import { io } from "socket.io-client"

export const socketClientChatting = io(
    process.env.NEXT_PUBLIC_SERVER_HOST + `/${ESocketNamespaces.Chatting}`,
    {
        autoConnect: false,
        withCredentials: true,
    }
)

export const SocketContextChatting = createContext(socketClientChatting)

export const useSocketChatting = () => useContext(SocketContextChatting)
