"use client"

import { ChatBackgroundContext } from "@/contexts/chatBackground.context"
import { useState } from "react"
import backgroundDarkPattern from "@/assets/images/chat_bg/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png"

export const ChatBackgroundProvider = ({ children }: { children: JSX.Element }) => {
    const [background, setChatBackground] = useState<string>(backgroundDarkPattern.src)

    return (
        <ChatBackgroundContext.Provider value={{ background, updateBackground: setChatBackground }}>
            {children}
        </ChatBackgroundContext.Provider>
    )
}
