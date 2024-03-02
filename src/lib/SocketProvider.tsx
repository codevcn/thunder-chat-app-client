"use client"

import { SocketClientContext, socketClient } from "@/contexts/socketContext"
import { useSocketConnection } from "@/hooks/socketConnection"

const SocketConnection = ({ children }: { children: JSX.Element }) => {
    useSocketConnection()
    return children
}

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    return (
        <SocketClientContext.Provider value={socketClient}>
            <SocketConnection>{children}</SocketConnection>
        </SocketClientContext.Provider>
    )
}
