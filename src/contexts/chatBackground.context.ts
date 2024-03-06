import { createContext, useContext } from "react"

type TChatBackgroundContext = {
    background: string | null
    updateBackground: (background: string) => void
}

const defaultContext: TChatBackgroundContext = {
    background: null,
    updateBackground: () => {},
}

export const ChatBackgroundContext = createContext<TChatBackgroundContext>(defaultContext)

export const useChatBackground = () => useContext(ChatBackgroundContext)
