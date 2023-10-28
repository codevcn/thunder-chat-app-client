import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux"
import { checkAuthThunk } from "@/redux/auth/authThunks"

export const useAuth = () => {
    const { authStatus } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuthThunk())
    }, [])

    return {
        authStatus,
    }
}