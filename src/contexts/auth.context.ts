import { EAuthStatus } from "@/utils/enums"
import { createContext, useContext } from "react"

export const AuthStatusContext = createContext<EAuthStatus>(EAuthStatus.UNKNOWN)

export const useAuthStatus = () => useContext(AuthStatusContext)
