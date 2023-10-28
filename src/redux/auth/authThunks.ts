import { createAsyncThunk } from '@reduxjs/toolkit'
import { checkAuthService } from '@/services/authService'

const checkAuthThunk = createAsyncThunk(
    'auth/checkAuth',
    checkAuthService
)

export {
    checkAuthThunk,
}