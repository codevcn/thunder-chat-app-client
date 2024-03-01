import { createContext, useContext } from "react"

export type TBackgroundContext = {
    background: string | null,
    updateBackground: (background: string) => void,
}

const defaultContext: TBackgroundContext = {
    background: null,
    updateBackground: () => { }
}

export const BackgroundContext = createContext<TBackgroundContext>(defaultContext)

export const useConvBackground = () => useContext(BackgroundContext)