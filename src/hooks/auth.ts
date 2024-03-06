import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux"
import { checkAuthThunk } from "@/redux/auth/auth.thunk"
import { EAuthStatus } from "@/utils/enums"

type TUseAuthReturn = {
    authStatus: EAuthStatus
}

export const useAuth = (): TUseAuthReturn => {
    const { authStatus } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authStatus === EAuthStatus.UNAUTHENTICATED || authStatus === EAuthStatus.UNKNOWN) {
            dispatch(checkAuthThunk())
        }
    }, [])

    return {
        authStatus,
    }
}
