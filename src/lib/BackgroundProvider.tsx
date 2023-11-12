'use client'

import { BackgroundContext } from "@/contexts/backgroundContext"
import { useState } from "react"
import backgroundDarkPattern from '@/assets/images/chat_bg/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png'

export const BackgroundProvider = ({ children }: { children: JSX.Element }) => {
    const [background, setBackground] = useState<string>(backgroundDarkPattern.src)

    return (
        <BackgroundContext.Provider value={{ background, updateBackground: setBackground }}>
            {children}
        </BackgroundContext.Provider>
    )
}