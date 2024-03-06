"use client"

import { socketClientChatting, SocketContextChatting } from "@/contexts/socket.context"
import { useSocketConnection } from "@/hooks/socketConnection"

const SocketConnection = ({ children }: { children: JSX.Element }) => {
    useSocketConnection()
    return children
}

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    return (
        <SocketContextChatting.Provider value={socketClientChatting}>
            <SocketConnection>{children}</SocketConnection>
        </SocketContextChatting.Provider>
    )
}
