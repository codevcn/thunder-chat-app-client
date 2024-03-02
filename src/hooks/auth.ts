import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux"
import { checkAuthThunk } from "@/redux/auth/authThunks"
import { EAuthStatus } from "@/utils/enums"

export const useAuth = () => {
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
