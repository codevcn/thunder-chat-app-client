import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux"
import { checkAuthThunk } from "@/redux/auth/authThunks"
import { EAuthStatuses } from "@/utils/enums"

export const useAuth = () => {
    const { authStatus } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authStatus === EAuthStatuses.UNAUTHENTICATED || authStatus === EAuthStatuses.UNKNOWN) {
            dispatch(checkAuthThunk())
        }
    }, [])

    return {
        authStatus,
    }
}
